import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, RotateCcw, Palette, Link2, Type, Contrast, SunMoon } from 'lucide-react'

const STYLE_ID = 'bh-a11y-styles'
const SVG_ID = 'bh-a11y-svg'

function injectResources() {
  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement('style')
    style.id = STYLE_ID
    style.textContent = `
      .bh-links-underline a { text-decoration: underline !important; }
      .bh-readable-font, .bh-readable-font * {
        font-family: Arial, Helvetica, sans-serif !important;
        letter-spacing: 0.04em !important;
        word-spacing: 0.1em !important;
      }
    `
    document.head.appendChild(style)
  }
  if (!document.getElementById(SVG_ID)) {
    const div = document.createElement('div')
    div.id = SVG_ID
    div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true">
      <defs>
        <filter id="bh-protanopia">
          <feColorMatrix type="matrix" values="0.567 0.433 0 0 0  0.558 0.442 0 0 0  0 0.242 0.758 0 0  0 0 0 1 0"/>
        </filter>
        <filter id="bh-deuteranopia">
          <feColorMatrix type="matrix" values="0.625 0.375 0 0 0  0.7 0.3 0 0 0  0 0.3 0.7 0 0  0 0 0 1 0"/>
        </filter>
        <filter id="bh-tritanopia">
          <feColorMatrix type="matrix" values="0.95 0.05 0 0 0  0 0.433 0.567 0 0  0 0.475 0.525 0 0  0 0 0 1 0"/>
        </filter>
      </defs>
    </svg>`
    document.body.appendChild(div)
  }
}

const FILTER_MAP = {
  grayscale: 'grayscale(1)',
  negative:  'invert(1) hue-rotate(180deg)',
  red:       'url(#bh-protanopia)',
  green:     'url(#bh-deuteranopia)',
  blue:      'url(#bh-tritanopia)',
}

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState(null)
  const [linksUnderline, setLinksUnderline] = useState(false)
  const [readableFont, setReadableFont] = useState(false)

  useEffect(() => { injectResources() }, [])

  useEffect(() => {
    document.documentElement.style.filter = activeFilter ? FILTER_MAP[activeFilter] : ''
  }, [activeFilter])

  useEffect(() => {
    document.body.classList.toggle('bh-links-underline', linksUnderline)
  }, [linksUnderline])

  useEffect(() => {
    document.body.classList.toggle('bh-readable-font', readableFont)
  }, [readableFont])

  const reset = () => {
    setActiveFilter(null)
    setLinksUnderline(false)
    setReadableFont(false)
  }

  const toggleFilter = (f) => setActiveFilter((prev) => (prev === f ? null : f))

  const btn = (active) =>
    `flex flex-col items-center justify-center gap-2 rounded-xl p-4 text-xs font-medium transition-all duration-150 ${
      active
        ? 'bg-white text-gray-900 shadow-inner'
        : 'bg-[#3a3a3a] text-white hover:bg-[#4a4a4a]'
    }`

  const TOOLS = [
    { id: 'grayscale', label: 'Grayscale',         icon: Contrast,  active: activeFilter === 'grayscale', onToggle: () => toggleFilter('grayscale') },
    { id: 'negative',  label: 'Negative Contrast',  icon: SunMoon,   active: activeFilter === 'negative',  onToggle: () => toggleFilter('negative') },
    { id: 'red',       label: 'Red-blind',           icon: Palette,   active: activeFilter === 'red',       onToggle: () => toggleFilter('red') },
    { id: 'green',     label: 'Green-blind',          icon: Palette,   active: activeFilter === 'green',     onToggle: () => toggleFilter('green') },
    { id: 'blue',      label: 'Blue-blind',           icon: Palette,   active: activeFilter === 'blue',      onToggle: () => toggleFilter('blue') },
    { id: 'links',     label: 'Links Underline',      icon: Link2,     active: linksUnderline,               onToggle: () => setLinksUnderline((v) => !v) },
    { id: 'font',      label: 'Readable Font',        icon: Type,      active: readableFont,                 onToggle: () => setReadableFont((v) => !v) },
  ]

  return (
    <>
      {/* Trigger tab — right edge, vertically centered */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="a11y-trigger"
            initial={{ x: 60 }}
            animate={{ x: 0 }}
            exit={{ x: 60 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open accessibility tools"
            className="fixed right-0 top-[35%] z-[70] -translate-y-1/2 flex flex-col items-center justify-center gap-1.5 rounded-l-xl bg-[#2b2b2b] px-2.5 py-5 text-white shadow-xl transition-colors hover:bg-[#3a3a3a]"
          >
            <span className="text-[18px] leading-none" aria-hidden="true">♿</span>
            <span
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
              className="text-[9px] font-semibold uppercase tracking-widest text-white/70"
            >
              Accessibility
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="a11y-panel"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed right-0 top-[35%] z-[70] -translate-y-1/2 w-72 overflow-hidden rounded-l-2xl bg-[#2b2b2b] shadow-2xl"
            role="dialog"
            aria-label="Accessibility Tools"
          >
            {/* Header */}
            <div className="flex items-start justify-between px-4 py-4">
              <div className="leading-tight">
                <p className="text-base font-semibold text-white">Accessibility</p>
                <p className="text-xs text-white/50">Tools</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close accessibility panel"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3a3a3a] text-white transition-colors hover:bg-[#4a4a4a]"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Tool grid */}
            <div className="grid grid-cols-2 gap-2 px-4">
              {TOOLS.map((tool) => {
                const Icon = tool.icon
                return (
                  <button
                    key={tool.id}
                    type="button"
                    onClick={tool.onToggle}
                    className={btn(tool.active)}
                  >
                    <Icon size={22} />
                    <span className="text-center leading-tight">{tool.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Reset */}
            <div className="p-4">
              <button
                type="button"
                onClick={reset}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3a3a3a] py-3 text-sm font-medium text-white transition-colors hover:bg-[#4a4a4a]"
              >
                <RotateCcw size={15} />
                Reset Settings
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
