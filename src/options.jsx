import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

function Options() {
  const [apiKey, setApiKey] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    chrome.storage.sync.get(['huggingfaceApiKey'], (result) => {
      if (result.huggingfaceApiKey) {
        setApiKey(result.huggingfaceApiKey)
      }
    })
  }, [])

  const handleSave = () => {
    chrome.storage.sync.set({ huggingfaceApiKey: apiKey }, () => {
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Bookmark Manager Pro - Einstellungen
        </h1>

        <div className="space-y-6">
          {/* API Key Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hugging Face API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="hf_xxxxxxxxxxxx"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="mt-2 text-sm text-gray-500">
              Für KI-gestützte Tag-Generierung. Kostenlos erhältlich auf{' '}
              <a
                href="https://huggingface.co/settings/tokens"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                huggingface.co
              </a>
            </p>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            {saved ? '✓ Gespeichert!' : 'Speichern'}
          </button>

          {/* Info */}
          <div className="mt-8 pt-6 border-t">
            <h2 className="font-semibold text-gray-800 mb-2">Über diese Erweiterung</h2>
            <p className="text-sm text-gray-600 mb-4">
              Bookmark Manager Pro hilft dir, deine Lesezeichen intelligent zu verwalten
              mit KI-generierten Tags, Notizen und toter-Links-Erkennung.
            </p>
            <p className="text-sm text-gray-500">
              Kontakt: stefan.buell@buell-hamburg.de
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>
)
