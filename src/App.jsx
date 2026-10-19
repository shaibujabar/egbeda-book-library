import { useMemo, useState } from 'react'
import {
  ArrowDownRight,
  ArrowRight,
  Bookmark,
  BookOpen,
  Check,
  ChevronDown,
  Clock3,
  GraduationCap,
  Heart,
  Library,
  Menu,
  Search,
  Sparkles,
  X,
} from 'lucide-react'

const books = [
  {
    id: 1,
    title: 'The Boy Who Harnessed the Wind',
    author: 'William Kamkwamba',
    category: 'Inspiring lives',
    grades: ['Grade 10', 'Grade 11', 'Grade 12'],
    note: 'A true story about curiosity, courage, and changing your world.',
    color: 'orange',
    coverTitle: 'THE BOY WHO\nHARNESSED\nTHE WIND',
    coverAuthor: 'WILLIAM KAMKWAMBA',
    badge: 'STUDENT FAVOURITE',
  },
  {
    id: 2,
    title: 'Purple Hibiscus',
    author: 'Chimamanda Ngozi Adichie',
    category: 'African stories',
    grades: ['Grade 11', 'Grade 12'],
    note: 'A powerful coming-of-age story, set in Nigeria.',
    color: 'purple',
    coverTitle: 'PURPLE\nHIBISCUS',
    coverAuthor: 'CHIMAMANDA NGOZI ADICHIE',
    badge: 'AFRICAN LITERATURE',
  },
  {
    id: 3,
    title: 'A Brief History of Time',
    author: 'Stephen Hawking',
    category: 'Science & discovery',
    grades: ['Grade 11', 'Grade 12'],
    note: 'Big ideas about the universe, made wonderfully approachable.',
    color: 'blue',
    coverTitle: 'A BRIEF\nHISTORY OF\nTIME',
    coverAuthor: 'STEPHEN HAWKING',
    badge: 'CURIOUS MINDS',
  },
  {
    id: 4,
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    category: 'Personal growth',
    grades: ['Grade 10', 'Grade 11', 'Grade 12'],
    note: 'A fable about finding your own path and following your dreams.',
    color: 'sage',
    coverTitle: 'THE\nALCHEMIST',
    coverAuthor: 'PAULO COELHO',
    badge: 'A JOURNEY WITHIN',
  },
  {
    id: 5,
    title: 'Born a Crime',
    author: 'Trevor Noah',
    category: 'Inspiring lives',
    grades: ['Grade 11', 'Grade 12'],
    note: 'A funny, moving memoir about identity and growing up.',
    color: 'red',
    coverTitle: 'BORN\nA CRIME',
    coverAuthor: 'TREVOR NOAH',
    badge: 'MEMOIR',
  },
  {
    id: 6,
    title: 'We Should All Be Feminists',
    author: 'Chimamanda Ngozi Adichie',
    category: 'Ideas & society',
    grades: ['Grade 10', 'Grade 11', 'Grade 12'],
    note: 'A clear and thoughtful invitation to imagine a fairer world.',
    color: 'yellow',
    coverTitle: 'WE SHOULD\nALL BE\nFEMINISTS',
    coverAuthor: 'CHIMAMANDA NGOZI ADICHIE',
    badge: 'NEW PERSPECTIVES',
  },
  {
    id: 7,
    title: 'The Old Man and the Sea',
    author: 'Ernest Hemingway',
    category: 'Fiction',
    grades: ['Grade 10', 'Grade 11'],
    note: 'A timeless tale of determination, dignity, and the open sea.',
    color: 'sea',
    coverTitle: 'THE OLD MAN\nAND THE SEA',
    coverAuthor: 'ERNEST HEMINGWAY',
    badge: 'A CLASSIC',
  },
  {
    id: 8,
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Personal growth',
    grades: ['Grade 10', 'Grade 11', 'Grade 12'],
    note: 'Small, practical changes that help good habits take root.',
    color: 'cream',
    coverTitle: 'ATOMIC\nHABITS',
    coverAuthor: 'JAMES CLEAR',
    badge: 'BUILD BETTER HABITS',
  },
]

const filters = ['All books', 'Grade 10', 'Grade 11', 'Grade 12']
const categories = [
  { label: 'All books', icon: Library },
  { label: 'African stories', icon: BookOpen },
  { label: 'Inspiring lives', icon: Sparkles },
  { label: 'Science & discovery', icon: GraduationCap },
  { label: 'Personal growth', icon: Heart },
]

function BookCover({ book, compact = false }) {
  return (
    <div className={`book-cover cover-${book.color} ${compact ? 'cover-compact' : ''}`} aria-label={`Cover art for ${book.title}`}>
      <span className="cover-badge">{book.badge}</span>
      <span className="cover-art-mark" aria-hidden="true" />
      <span className="cover-title">{book.coverTitle.split('\n').map((line, index) => <span key={index}>{line}</span>)}</span>
      <span className="cover-author">{book.coverAuthor}</span>
      <span className="cover-spine" aria-hidden="true" />
    </div>
  )
}

function App() {
  const [grade, setGrade] = useState('All books')
  const [category, setCategory] = useState('All books')
  const [query, setQuery] = useState('')
  const [saved, setSaved] = useState([])
  const [showSaved, setShowSaved] = useState(false)
  const [mobileNav, setMobileNav] = useState(false)

  const visibleBooks = useMemo(() => books.filter((book) => {
    const matchesGrade = grade === 'All books' || book.grades.includes(grade)
    const matchesCategory = category === 'All books' || book.category === category
    const matchesSaved = !showSaved || saved.includes(book.id)
    const search = query.trim().toLowerCase()
    const matchesQuery = !search || `${book.title} ${book.author} ${book.category} ${book.note}`.toLowerCase().includes(search)
    return matchesGrade && matchesCategory && matchesSaved && matchesQuery
  }), [category, grade, query, saved, showSaved])

  function toggleSaved(id) {
    setSaved((current) => current.includes(id) ? current.filter((bookId) => bookId !== id) : [...current, id])
  }

  function selectGrade(value) {
    setGrade(value)
    setShowSaved(false)
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNav ? 'sidebar-open' : ''}`}>
        <a className="brand" href="#home" onClick={() => setMobileNav(false)}>
          <span className="brand-mark"><BookOpen size={20} strokeWidth={1.8} /></span>
          <span className="brand-copy"><strong>chapter<span>one</span></strong><small>THE SCHOOL LIBRARY</small></span>
        </a>
        <button className="nav-close" onClick={() => setMobileNav(false)} aria-label="Close menu"><X size={20} /></button>

        <div className="side-section">
          <p className="side-label">YOUR LIBRARY</p>
          <button className={`side-link ${!showSaved && category === 'All books' ? 'side-link-active' : ''}`} onClick={() => { setCategory('All books'); setShowSaved(false) }}>
            <Library size={17} /><span>Browse books</span><span className="side-count">08</span>
          </button>
          <button className={`side-link ${showSaved ? 'side-link-active' : ''}`} onClick={() => setShowSaved(true)}>
            <Bookmark size={17} /><span>My reading list</span><span className="side-count">{String(saved.length).padStart(2, '0')}</span>
          </button>
        </div>

        <div className="side-section browse-section">
          <p className="side-label">BROWSE BY SUBJECT</p>
          {categories.map(({ label, icon: Icon }) => (
            <button key={label} className={`side-link ${category === label && !showSaved ? 'side-link-active' : ''}`} onClick={() => { setCategory(label); setShowSaved(false) }}>
              <Icon size={17} /><span>{label}</span>
            </button>
          ))}
        </div>

        <div className="sidebar-note">
          <span className="note-icon"><Sparkles size={15} /></span>
          <p className="note-eyebrow">A LITTLE REMINDER</p>
          <p className="note-text">Every book is a chance to become a little more <em>you.</em></p>
          <span className="note-decoration">✳</span>
        </div>

        <div className="sidebar-bottom">
          <div className="profile-avatar">A</div>
          <div className="profile-copy"><strong>Alex Morgan</strong><span>Senior student</span></div>
          <ChevronDown size={16} className="profile-chevron" />
        </div>
      </aside>

      {mobileNav && <button className="nav-backdrop" onClick={() => setMobileNav(false)} aria-label="Close navigation" />}

      <main className="main-content" id="home">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobileNav(true)} aria-label="Open menu"><Menu size={21} /></button>
          <div className="breadcrumbs"><span>Library</span><span className="breadcrumb-slash">/</span><strong>{showSaved ? 'My reading list' : category}</strong></div>
          <div className="topbar-right"><span className="open-status"><span />Library open</span><span className="topbar-divider" /><span className="topbar-date">MONDAY, 19 OCT</span></div>
        </header>

        <div className="page-inner">
          <section className="welcome-row">
            <div>
              <p className="eyebrow"><span className="eyebrow-line" /> YOUR NEXT CHAPTER STARTS HERE</p>
              <h1>Good morning, Alex<span className="wave">.</span></h1>
              <p className="welcome-copy">A good book can take you anywhere. Find one that speaks to you.</p>
            </div>
            <div className="welcome-stamp"><span className="stamp-star">✳</span><span>READ<br />GROW<br />REPEAT</span><ArrowDownRight size={15} /></div>
          </section>

          <section className="hero-card">
            <div className="hero-copy">
              <span className="hero-kicker"><Sparkles size={13} /> THIS WEEK'S PICK</span>
              <h2>Big dreams.<br /><em>Brighter futures.</em></h2>
              <p>Stories and ideas to help you see what's possible — and find the courage to make it happen.</p>
              <button className="hero-button" onClick={() => { setCategory('Inspiring lives'); setShowSaved(false); document.getElementById('book-shelf')?.scrollIntoView({ behavior: 'smooth' }) }}>
                Explore inspiring reads <ArrowRight size={15} />
              </button>
            </div>
            <div className="hero-art" aria-hidden="true">
              <span className="hero-sun" />
              <span className="hero-orbit orbit-one" />
              <span className="hero-orbit orbit-two" />
              <div className="hero-book hero-book-back"><span>THE<br />COURAGE<br />TO BEGIN</span><small>YOUR STORY STARTS NOW</small></div>
              <div className="hero-book hero-book-front"><span>MAKE<br />IT<br />HAPPEN</span><small>THE NEXT CHAPTER IS YOURS</small></div>
              <span className="hero-spark spark-one">✳</span>
              <span className="hero-spark spark-two">✦</span>
              <span className="hero-art-caption">A WORLD OF<br />POSSIBILITY</span>
            </div>
            <div className="hero-index">01 <span>/</span> 03</div>
          </section>

          <section className="shelf-section" id="book-shelf">
            <div className="section-heading">
              <div>
                <p className="eyebrow section-eyebrow"><span className="eyebrow-line" /> THE GOOD STUFF</p>
                <h2>{showSaved ? 'Your reading list' : 'Find your next read'}<span className="heading-period">.</span></h2>
              </div>
              <a className="view-all" href="#book-shelf" onClick={(event) => { event.preventDefault(); setGrade('All books'); setCategory('All books'); setShowSaved(false); setQuery('') }}>View all books <ArrowRight size={15} /></a>
            </div>

            <div className="controls-row">
              <div className="grade-tabs" role="tablist" aria-label="Filter books by grade">
                {filters.map((filter) => (
                  <button key={filter} role="tab" aria-selected={grade === filter} className={grade === filter ? 'grade-tab selected' : 'grade-tab'} onClick={() => selectGrade(filter)}>{filter}</button>
                ))}
              </div>
              <label className="search-box">
                <Search size={16} />
                <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search books, authors..." aria-label="Search books and authors" />
                {query && <button className="clear-search" onClick={() => setQuery('')} aria-label="Clear search"><X size={14} /></button>}
              </label>
            </div>

            {category !== 'All books' && !showSaved && (
              <div className="active-filter">
                <span>Showing: <strong>{category}</strong></span>
                <button onClick={() => setCategory('All books')}>Clear filter <X size={13} /></button>
              </div>
            )}

            {visibleBooks.length > 0 ? (
              <div className="book-grid">
                {visibleBooks.map((book) => (
                  <article className="book-card" key={book.id}>
                    <div className="cover-wrap">
                      <BookCover book={book} />
                      <button className={`save-button ${saved.includes(book.id) ? 'is-saved' : ''}`} onClick={() => toggleSaved(book.id)} aria-label={saved.includes(book.id) ? `Remove ${book.title} from reading list` : `Add ${book.title} to reading list`}>
                        {saved.includes(book.id) ? <Check size={15} /> : <Bookmark size={15} />}
                      </button>
                    </div>
                    <div className="book-info">
                      <span className="book-category">{book.category}</span>
                      <h3>{book.title}</h3>
                      <p className="book-author">by {book.author}</p>
                      <p className="book-note">{book.note}</p>
                      <div className="book-meta">
                        <span><GraduationCap size={14} /> {book.grades.join(' · ')}</span>
                        <span className="availability"><span /> Available</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <span className="empty-icon"><BookOpen size={23} /></span>
                <h3>{showSaved ? 'Your list is a fresh page.' : 'No books found just yet.'}</h3>
                <p>{showSaved ? 'Tap the bookmark on any book to save it for later.' : 'Try another search or choose a different grade or subject.'}</p>
                <button onClick={() => { setQuery(''); setCategory('All books'); setGrade('All books'); setShowSaved(false) }}>Browse all books <ArrowRight size={14} /></button>
              </div>
            )}

            <div className="shelf-footer">
              <span><BookOpen size={15} /> Showing {visibleBooks.length} of 08 books</span>
              <span><Clock3 size={14} /> Borrow for up to 2 weeks</span>
            </div>
          </section>

          <footer className="page-footer">
            <span>Made for curious minds <span className="footer-heart">♥</span></span>
            <span>Need a hand? <a href="mailto:librarian@chapterone.school">Ask your librarian <ArrowRight size={12} /></a></span>
          </footer>
        </div>
      </main>
    </div>
  )
}

export default App
