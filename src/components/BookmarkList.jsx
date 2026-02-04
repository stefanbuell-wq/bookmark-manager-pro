import React, { useState } from 'react'

export default function BookmarkList({
  bookmarks,
  tags,
  meta,
  onDelete,
  onSaveTags,
  onSaveMeta,
  onGenerateTags
}) {
  const [editingId, setEditingId] = useState(null)
  const [editTags, setEditTags] = useState([])
  const [editNotes, setEditNotes] = useState('')
  const [editReason, setEditReason] = useState('')
  const [newTag, setNewTag] = useState('')
  const [generating, setGenerating] = useState(null)

  const startEdit = (bookmark) => {
    setEditingId(bookmark.id)
    setEditTags(tags[bookmark.url] || [])
    setEditNotes(meta[bookmark.url]?.notes || '')
    setEditReason(meta[bookmark.url]?.reason || '')
  }

  const saveEdit = async (bookmark) => {
    await onSaveTags(bookmark.url, editTags)
    await onSaveMeta(bookmark.url, editNotes, editReason)
    setEditingId(null)
  }

  const addTag = () => {
    const tag = newTag.trim().toLowerCase()
    if (tag && !editTags.includes(tag)) {
      setEditTags([...editTags, tag])
    }
    setNewTag('')
  }

  const removeTag = (tag) => {
    setEditTags(editTags.filter(t => t !== tag))
  }

  const handleGenerateTags = async (bookmark) => {
    setGenerating(bookmark.id)
    try {
      const newTags = await onGenerateTags(bookmark.url, bookmark.title)
      const merged = [...new Set([...(tags[bookmark.url] || []), ...newTags])]
      await onSaveTags(bookmark.url, merged)
    } catch (e) {
      console.error(e)
    }
    setGenerating(null)
  }

  if (bookmarks.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 text-sm">
        Keine Lesezeichen gefunden
      </div>
    )
  }

  return (
    <div className="divide-y">
      {bookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="p-3 hover:bg-white transition"
        >
          {editingId === bookmark.id ? (
            // Edit Mode
            <div className="space-y-2">
              <div className="font-medium text-sm truncate">{bookmark.title}</div>

              {/* Tags */}
              <div>
                <label className="text-xs text-gray-500">Tags</label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {editTags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="text-green-500 hover:text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-1 mt-1">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addTag()}
                    placeholder="Tag hinzufügen"
                    className="flex-1 text-xs border rounded px-2 py-1"
                  />
                  <button
                    onClick={addTag}
                    className="px-2 py-1 bg-green-600 text-white text-xs rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Reason */}
              <div>
                <label className="text-xs text-gray-500">Warum gespeichert?</label>
                <input
                  type="text"
                  value={editReason}
                  onChange={(e) => setEditReason(e.target.value)}
                  placeholder="z.B. Interessanter Artikel"
                  className="w-full text-xs border rounded px-2 py-1 mt-1"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="text-xs text-gray-500">Notizen</label>
                <textarea
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Freitext..."
                  className="w-full text-xs border rounded px-2 py-1 mt-1 h-16 resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => saveEdit(bookmark)}
                  className="flex-1 py-1 bg-blue-600 text-white text-xs rounded"
                >
                  Speichern
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="flex-1 py-1 bg-gray-200 text-gray-700 text-xs rounded"
                >
                  Abbrechen
                </button>
              </div>
            </div>
          ) : (
            // View Mode
            <>
              <div className="flex items-start gap-2">
                <div className="flex-1 min-w-0">
                  <a
                    href={bookmark.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-sm text-blue-600 hover:underline block truncate"
                  >
                    {bookmark.title || bookmark.url}
                  </a>
                  <div className="text-xs text-gray-400 truncate">{bookmark.url}</div>
                  {bookmark.folder && (
                    <div className="text-xs text-purple-500 mt-0.5">
                      📁 {bookmark.folder}
                    </div>
                  )}
                </div>

                <div className="flex gap-1">
                  <button
                    onClick={() => handleGenerateTags(bookmark)}
                    disabled={generating === bookmark.id}
                    className="p-1 text-purple-600 hover:bg-purple-100 rounded"
                    title="Tags generieren"
                  >
                    {generating === bookmark.id ? '...' : '🤖'}
                  </button>
                  <button
                    onClick={() => startEdit(bookmark)}
                    className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                    title="Bearbeiten"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => onDelete(bookmark.id)}
                    className="p-1 text-red-600 hover:bg-red-100 rounded"
                    title="Löschen"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {/* Tags */}
              {tags[bookmark.url]?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {tags[bookmark.url].map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Meta info */}
              {(meta[bookmark.url]?.reason || meta[bookmark.url]?.notes) && (
                <div className="mt-2 p-2 bg-yellow-50 rounded text-xs">
                  {meta[bookmark.url]?.reason && (
                    <div className="text-yellow-800">
                      💡 {meta[bookmark.url].reason}
                    </div>
                  )}
                  {meta[bookmark.url]?.notes && (
                    <div className="text-gray-600 mt-1 line-clamp-2">
                      📝 {meta[bookmark.url].notes}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  )
}
