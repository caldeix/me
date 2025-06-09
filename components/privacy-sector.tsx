"use client"

interface PrivacySectorProps {
  show: boolean
  showPrivacity: boolean
  setShow: (show: boolean) => void
  setShowPrivacity: (show: boolean) => void
  data: any
}

export default function PrivacySector({ show, showPrivacity, setShow, setShowPrivacity, data }: PrivacySectorProps) {
  const hidePolicy = () => {
    setShow(false)
    localStorage.setItem("cookiesAccepted", "true")
  }

  const hidePrivacity = () => {
    setShowPrivacity(false)
  }

  if (!show && !showPrivacity) {
    return null
  }

  return (
    <section className="privacy-sector">
      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-70 flex items-center justify-center z-50 p-4 transition-colors duration-300">
          <div className="bg-white dark:bg-slate-800 rounded-lg max-w-2xl max-h-[80vh] overflow-y-auto p-6 shadow-2xl transition-colors duration-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 transition-colors duration-300">
                {data.cookiePolicy.title}
              </h2>
              <button
                onClick={hidePolicy}
                className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300"
              >
                {data.cookiePolicy.acceptButton}
              </button>
            </div>
            <div className="text-slate-600 dark:text-slate-300 space-y-4 transition-colors duration-300">
              <p className="text-sm">{data.cookiePolicy.description}</p>
              <p>{data.cookiePolicy.content}</p>
              <p>{data.cookiePolicy.usage}</p>
            </div>
          </div>
        </div>
      )}

      {showPrivacity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-70 flex items-center justify-center z-50 p-4 transition-colors duration-300">
          <div className="bg-white dark:bg-slate-800 rounded-lg max-w-2xl max-h-[80vh] overflow-y-auto p-6 shadow-2xl transition-colors duration-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 transition-colors duration-300">
                {data.privacyPolicy.title}
              </h2>
              <button
                onClick={hidePrivacity}
                className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300"
              >
                {data.privacyPolicy.closeButton}
              </button>
            </div>
            <div className="text-slate-600 dark:text-slate-300 space-y-4 transition-colors duration-300">
              <p>
                <strong>{data.privacyPolicy.lastUpdated}</strong>
              </p>
              {data.privacyPolicy.sections.map((section: any, index: number) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 transition-colors duration-300">
                    {section.title}
                  </h3>
                  <p>{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
