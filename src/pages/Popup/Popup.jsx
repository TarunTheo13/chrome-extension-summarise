import React, { useState, useEffect } from 'react';
import './Popup.css';

const Popup = () => {
  const [summaries, setSummaries] = useState([]);
  const [selectedSummary, setSelectedSummary] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadSummaries();
  }, []);

  const loadSummaries = () => {
    chrome.storage.local.get(['summaries'], (result) => {
      setSummaries(result.summaries || []);
    });
  };

  const deleteSummary = (id) => {
    const updatedSummaries = summaries.filter((s) => s.id !== id);
    chrome.storage.local.set({ summaries: updatedSummaries }, () => {
      setSummaries(updatedSummaries);
      if (selectedSummary?.id === id) {
        setSelectedSummary(null);
      }
    });
  };

  const clearAllSummaries = () => {
    if (window.confirm('Are you sure you want to delete all summaries?')) {
      chrome.storage.local.set({ summaries: [] }, () => {
        setSummaries([]);
        setSelectedSummary(null);
      });
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const openUrl = (url) => {
    chrome.tabs.create({ url });
  };

  const filteredSummaries = summaries.filter(
    (summary) =>
      summary.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      summary.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="explainx-popup">
      <div className="explainx-popup-header">
        <div className="explainx-popup-header-content">
          <div className="explainx-popup-logo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <h1>Explainx</h1>
          </div>
          <p className="explainx-popup-subtitle">Your saved summaries</p>
        </div>
      </div>

      <div className="explainx-popup-body">
        {summaries.length > 0 ? (
          <>
            <div className="explainx-search-section">
              <div className="explainx-search-bar">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
                <input
                  type="text"
                  placeholder="Search summaries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                className="explainx-clear-all-btn"
                onClick={clearAllSummaries}
                title="Clear all summaries"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>

            {filteredSummaries.length > 0 ? (
              <div className="explainx-summaries-list">
                {filteredSummaries.map((summary) => (
                  <div
                    key={summary.id}
                    className={`explainx-summary-card ${selectedSummary?.id === summary.id ? 'selected' : ''
                      }`}
                    onClick={() =>
                      setSelectedSummary(
                        selectedSummary?.id === summary.id ? null : summary
                      )
                    }
                  >
                    <div className="explainx-summary-header">
                      <h3 className="explainx-summary-title">
                        {summary.title}
                      </h3>
                      <span className="explainx-summary-time">
                        {formatDate(summary.savedAt)}
                      </span>
                    </div>
                    <p className="explainx-summary-preview">
                      {summary.content.substring(0, 120)}
                      {summary.content.length > 120 ? '...' : ''}
                    </p>

                    {selectedSummary?.id === summary.id && (
                      <div className="explainx-summary-expanded">
                        <div className="explainx-summary-url">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                          </svg>
                          <span>{summary.url}</span>
                        </div>
                        <div className="explainx-summary-content">
                          {summary.content}
                        </div>
                        <div className="explainx-summary-actions">
                          <button
                            className="explainx-action-btn explainx-action-btn-primary"
                            onClick={(e) => {
                              e.stopPropagation();
                              openUrl(summary.url);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                              <polyline points="15 3 21 3 21 9"></polyline>
                              <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                            Open Page
                          </button>
                          <button
                            className="explainx-action-btn explainx-action-btn-danger"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteSummary(summary.id);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="explainx-empty-state">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
                <h2>No matching summaries</h2>
                <p>Try adjusting your search</p>
              </div>
            )}
          </>
        ) : (
          <div className="explainx-empty-state">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <h2>No summaries yet</h2>
            <p>Start by clicking the Explainx button on any webpage</p>
          </div>
        )}
      </div>

      <div className="explainx-popup-footer">
        <div className="explainx-footer-text">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <span>
            {summaries.length} {summaries.length === 1 ? 'summary' : 'summaries'}{' '}
            saved
          </span>
        </div>
      </div>
    </div>
  );
};

export default Popup;
