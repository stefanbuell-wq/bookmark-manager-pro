import React, { useState, useEffect } from 'react'
import BookmarkList from './components/BookmarkList'
import SearchBar from './components/SearchBar'
import TagFilter from './components/TagFilter'

// Storage helpers
const storage = {
  async getTags() {
    return new Promise((resolve) => {
      chrome.storage.local.get(['bookmarkTags'], (result) => {
        resolve(result.bookmarkTags || {})
      })
    })
  },
  async setTags(tags) {
    return chrome.storage.local.set({ bookmarkTags: tags })
  },
  async getMeta() {
    return new Promise((resolve) => {
      chrome.storage.local.get(['bookmarkMeta'], (result) => {
        resolve(result.bookmarkMeta || {})
      })
    })
  },
  async setMeta(meta) {
    return chrome.storage.local.set({ bookmarkMeta: meta })
  }
}

export default function App() {
  const [bookmarks, setBookmarks] = useState([])
  const [filteredBookmarks, setFilteredBookmarks] = useState([])
  const [tags, setTags] = useState({})
  const [meta, setMeta] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('bookmarks') // bookmarks, deadlinks

  // Load bookmarks and data
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)

    // Get bookmarks from browser
    chrome.bookmarks.getTree((tree) => {
      const flat = flattenBookmarks(tree)
      setBookmarks(flat)
      setFilteredBookmarks(flat)
    })

    // Load tags and meta from storage
    const savedTags = await storage.getTags()
    const savedMeta = await storage.getMeta()
    setTags(savedTags)
    setMeta(savedMeta)

    setLoading(false)
  }

  // Flatten bookmark tree
  const flattenBookmarks = (nodes, folder = '') => {
    const result = []

    const traverse = (items, currentFolder) => {
      for (const item of items) {
        if (item.url) {
          result.push({
            id: item.id,
            title: item.title,
            url: item.url,
            folder: currentFolder,
            dateAdded: item.dateAdded
          })
        }
        if (item.children) {
          const newFolder = item.title
            ? (currentFolder ? `${currentFolder}/${item.title}` : item.title)
            : currentFolder
          traverse(item.children, newFolder)
        }
      }
    }

    traverse(nodes, folder)
    return result
  }

  // Filter bookmarks
  useEffect(() => {
    let result = bookmarks

    // Search filter
    if (searchTerm) {
      const lower = searchTerm.toLowerCase()
      result = result.filter(b =>
        b.title?.toLowerCase().includes(lower) ||
        b.url.toLowerCase().includes(lower) ||
        b.folder?.toLowerCase().includes(lower) ||
        (tags[b.url] || []).some(t => t.includes(lower)) ||
        meta[b.url]?.notes?.toLowerCase().includes(lower) ||
        meta[b.url]?.reason?.toLowerCase().includes(lower)
      )
    }

    // Tag filter
    if (selectedTag) {
      result = result.filter(b =>
        (tags[b.url] || []).includes(selectedTag)
      )
    }

    setFilteredBookmarks(result)
  }, [searchTerm, selectedTag, bookmarks, tags, meta])

  // Get all unique tags
  const allTags = [...new Set(Object.values(tags).flat())].sort()

  // Save tags for a bookmark
  const saveTags = async (url, newTags) => {
    const updated = { ...tags, [url]: newTags }
    setTags(updated)
    await storage.setTags(updated)
  }

  // Save meta for a bookmark
  const saveMeta = async (url, notes, reason) => {
    const updated = {
      ...meta,
      [url]: { notes, reason, updatedAt: new Date().toISOString() }
    }
    setMeta(updated)
    await storage.setMeta(updated)
  }

  // Delete bookmark
  const deleteBookmark = async (id) => {
    if (!confirm('Lesezeichen löschen?')) return

    chrome.bookmarks.remove(id, () => {
      setBookmarks(prev => prev.filter(b => b.id !== id))
    })
  }

  // Generate tags for bookmark
  const generateTags = async (url, title) => {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        { action: 'generateTags', url, title },
        (response) => resolve(response || [])
      )
    })
  }

  return (
    <div className="flex flex-col h-[500px] bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3">
        <h1 className="text-lg font-bold">Bookmark Manager Pro</h1>
        <p className="text-xs text-blue-100">{bookmarks.length} Lesezeichen</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b bg-white">
        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`flex-1 py-2 text-sm font-medium transition
            ${activeTab === 'bookmarks'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'}`}
        >
          Lesezeichen
        </button>
        <button
          onClick={() => setActiveTab('deadlinks')}
          className={`flex-1 py-2 text-sm font-medium transition
            ${activeTab === 'deadlinks'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'}`}
        >
          Tote Links
        </button>
      </div>

      {/* Search */}
      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      {/* Tag filter */}
      {allTags.length > 0 && (
        <TagFilter
          tags={allTags}
          selected={selectedTag}
          onSelect={setSelectedTag}
        />
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <span className="text-gray-500">Laden...</span>
          </div>
        ) : activeTab === 'bookmarks' ? (
          <BookmarkList
            bookmarks={filteredBookmarks}
            tags={tags}
            meta={meta}
            onDelete={deleteBookmark}
            onSaveTags={saveTags}
            onSaveMeta={saveMeta}
            onGenerateTags={generateTags}
          />
        ) : (
          <DeadLinkChecker
            bookmarks={bookmarks}
            onDelete={deleteBookmark}
          />
        )}
      </div>

      {/* Footer */}
      <div className="bg-white border-t p-2 text-center">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            chrome.runtime.openOptionsPage()
          }}
          className="text-xs text-blue-600 hover:underline"
        >
          Einstellungen
        </a>
        <span className="text-gray-300 mx-2">|</span>
        <span className="text-xs text-gray-500">stefan.buell@buell-hamburg.de</span>
      </div>
    </div>
  )
}

// Dead Link Checker Component
function DeadLinkChecker({ bookmarks, onDelete }) {
  const [checking, setChecking] = useState(false)
  const [progress, setProgress] = useState({ current: 0, total: 0 })
  const [deadLinks, setDeadLinks] = useState([])
  const [done, setDone] = useState(false)

  const checkLinks = async () => {
    setChecking(true)
    setDeadLinks([])
    setDone(false)
    setProgress({ current: 0, total: bookmarks.length })

    const dead = []

    for (let i = 0; i < bookmarks.length; i++) {
      const bookmark = bookmarks[i]

      try {
        const result = await new Promise((resolve) => {
          chrome.runtime.sendMessage(
            { action: 'checkUrl', url: bookmark.url },
            resolve
          )
        })

        if (!result.ok) {
          dead.push({ ...bookmark, error: result.error })
        }
      } catch {
        dead.push({ ...bookmark, error: 'Fehler' })
      }

      setProgress({ current: i + 1, total: bookmarks.length })
      setDeadLinks([...dead])
    }

    setChecking(false)
    setDone(true)
  }

  return (
    <div className="p-3">
      <button
        onClick={checkLinks}
        disabled={checking}
        className={`w-full py-2 rounded text-white font-medium transition
          ${checking ? 'bg-gray-400' : 'bg-orange-500 hover:bg-orange-600'}`}
      >
        {checking
          ? `Prüfe... (${progress.current}/${progress.total})`
          : 'Alle Links prüfen'}
      </button>

      {checking && (
        <div className="mt-2 bg-gray-200 rounded h-2">
          <div
            className="bg-orange-500 h-2 rounded transition-all"
            style={{ width: `${(progress.current / progress.total) * 100}%` }}
          />
        </div>
      )}

      {done && deadLinks.length === 0 && (
        <p className="mt-4 text-center text-green-600 text-sm">
          Alle Links sind erreichbar!
        </p>
      )}

      {deadLinks.length > 0 && (
        <div className="mt-3 space-y-2">
          <p className="text-sm text-red-600 font-medium">
            {deadLinks.length} tote Links gefunden
          </p>
          {deadLinks.map((link) => (
            <div
              key={link.id}
              className="p-2 bg-red-50 border border-red-200 rounded text-sm"
            >
              <div className="font-medium truncate">{link.title}</div>
              <div className="text-xs text-gray-500 truncate">{link.url}</div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-red-500">{link.error}</span>
                <button
                  onClick={() => onDelete(link.id)}
                  className="text-xs text-red-600 hover:text-red-800"
                >
                  Löschen
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
