import React from 'react'

export default function TagFilter({ tags, selected, onSelect }) {
  return (
    <div className="p-2 bg-white border-b">
      <div className="flex flex-wrap gap-1">
        <button
          onClick={() => onSelect('')}
          className={`px-2 py-1 text-xs rounded transition
            ${!selected
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          Alle
        </button>
        {tags.slice(0, 10).map((tag) => (
          <button
            key={tag}
            onClick={() => onSelect(selected === tag ? '' : tag)}
            className={`px-2 py-1 text-xs rounded transition
              ${selected === tag
                ? 'bg-green-600 text-white'
                : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
          >
            {tag}
          </button>
        ))}
        {tags.length > 10 && (
          <span className="px-2 py-1 text-xs text-gray-400">
            +{tags.length - 10} mehr
          </span>
        )}
      </div>
    </div>
  )
}
