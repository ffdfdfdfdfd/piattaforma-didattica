export type Categoria =
  | 'Office'
  | 'Linguaggi'
  | 'Frontend'
  | 'SQL'
  | 'NoSQL'
  | 'Sistemi'
  | 'Storici'

export type Difficolta = 'base' | 'intermedio' | 'avanzato'

export type Corso = {
  slug: string
  titolo: string
  categoria: Categoria
  anno: string
  difficolta: Difficolta
  descrizione: string
  prerequisiti: string[]
}

export const corsi: Corso[] = [
  // --- OFFICE (biennio) ---
  { slug: 'word', titolo: 'Microsoft Word', categoria: 'Office', anno: '1-2', difficolta: 'base', descrizione: 'Documenti, formattazione, stili, impaginazione, tabelle, revisione e stampa.', prerequisiti: [] },
  { slug: 'powerpoint', titolo: 'Microsoft PowerPoint', categoria: 'Office', anno: '1-2', difficolta: 'base', descrizione: 'Presentazioni efficaci: layout, temi, contenuti, animazioni ed esportazione.', prerequisiti: [] },
  { slug: 'excel', titolo: 'Microsoft Excel', categoria: 'Office', anno: '1-2', difficolta: 'base', descrizione: 'Celle, formule, funzioni, tabelle, grafici e analisi dei dati.', prerequisiti: [] },
  { slug: 'competenze-digitali', titolo: 'Competenze digitali di base', categoria: 'Office', anno: '1-2', difficolta: 'base', descrizione: 'File, cartelle, sistema operativo, sicurezza, rete e uso consapevole del computer.', prerequisiti: [] },

  // --- LINGUAGGI ---
  { slug: 'python', titolo: 'Python', categoria: 'Linguaggi', anno: '3-5', difficolta: 'base', descrizione: 'Dalle basi alla programmazione a oggetti, librerie e progetti reali.', prerequisiti: [] },
  { slug: 'java', titolo: 'Java', categoria: 'Linguaggi', anno: '3-5', difficolta: 'intermedio', descrizione: 'Sintassi, OOP, collezioni, eccezioni, I/O e introduzione a Spring.', prerequisiti: ['Programmazione di base'] },
  { slug: 'c', titolo: 'C', categoria: 'Linguaggi', anno: '3-5', difficolta: 'intermedio', descrizione: 'Puntatori, memoria, struct, file e programmazione di sistema.', prerequisiti: [] },
  { slug: 'cpp', titolo: 'C++', categoria: 'Linguaggi', anno: '3-5', difficolta: 'avanzato', descrizione: 'OOP, template, STL, gestione della memoria e C++ moderno.', prerequisiti: ['C'] },
  { slug: 'csharp', titolo: 'C#', categoria: 'Linguaggi', anno: '3-5', difficolta: 'intermedio', descrizione: 'OOP, LINQ, async/await, .NET e sviluppo di applicazioni.', prerequisiti: ['Programmazione di base'] },
  { slug: 'rust', titolo: 'Rust', categoria: 'Linguaggi', anno: '4-5', difficolta: 'avanzato', descrizione: 'Ownership, borrowing, lifetimes, trait e sicurezza della memoria.', prerequisiti: ['C'] },
  { slug: 'go', titolo: 'Go (Golang)', categoria: 'Linguaggi', anno: '3-5', difficolta: 'intermedio', descrizione: 'Goroutine, channel, interfacce e sviluppo di servizi.', prerequisiti: [] },
  { slug: 'php', titolo: 'PHP', categoria: 'Linguaggi', anno: '3-5', difficolta: 'base', descrizione: 'Sintassi, sessioni, database e sviluppo web lato server.', prerequisiti: ['HTML'] },
  { slug: 'ruby', titolo: 'Ruby', categoria: 'Linguaggi', anno: '3-5', difficolta: 'intermedio', descrizione: 'Sintassi espressiva, blocchi, moduli e introduzione a Rails.', prerequisiti: [] },
  { slug: 'kotlin', titolo: 'Kotlin', categoria: 'Linguaggi', anno: '3-5', difficolta: 'intermedio', descrizione: 'Linguaggio moderno per Android e JVM con null-safety.', prerequisiti: ['Java'] },
  { slug: 'swift', titolo: 'Swift', categoria: 'Linguaggi', anno: '3-5', difficolta: 'intermedio', descrizione: 'Sviluppo di app per iOS e macOS con SwiftUI.', prerequisiti: [] },
  { slug: 'typescript', titolo: 'TypeScript', categoria: 'Linguaggi', anno: '3-5', difficolta: 'intermedio', descrizione: 'JavaScript con tipi statici, generics, utility types e tooling.', prerequisiti: ['JavaScript'] },
  { slug: 'dart', titolo: 'Dart', categoria: 'Linguaggi', anno: '3-5', difficolta: 'intermedio', descrizione: 'Linguaggio per Flutter: async, stream e UI cross-platform.', prerequisiti: [] },
  { slug: 'scala', titolo: 'Scala', categoria: 'Linguaggi', anno: '4-5', difficolta: 'avanzato', descrizione: 'Programmazione funzionale e a oggetti su JVM.', prerequisiti: ['Java'] },
  { slug: 'perl', titolo: 'Perl', categoria: 'Linguaggi', anno: '4-5', difficolta: 'intermedio', descrizione: 'Elaborazione testuale, regex e scripting di sistema.', prerequisiti: [] },
  { slug: 'elixir', titolo: 'Elixir', categoria: 'Linguaggi', anno: '4-5', difficolta: 'avanzato', descrizione: 'Programmazione funzionale, concorrenza e framework Phoenix.', prerequisiti: [] },
  { slug: 'clojure', titolo: 'Clojure', categoria: 'Linguaggi', anno: '4-5', difficolta: 'avanzato', descrizione: 'Lisp su JVM: immutabilità, REPL e programmazione funzionale.', prerequisiti: [] },
  { slug: 'haskell', titolo: 'Haskell', categoria: 'Linguaggi', anno: '4-5', difficolta: 'avanzato', descrizione: 'Tipi, funtori, monadi e programmazione puramente funzionale.', prerequisiti: [] },
  { slug: 'lua', titolo: 'Lua', categoria: 'Linguaggi', anno: '3-5', difficolta: 'base', descrizione: 'Linguaggio leggero per scripting, giochi e embedded.', prerequisiti: [] },
  { slug: 'zig', titolo: 'Zig', categoria: 'Linguaggi', anno: '4-5', difficolta: 'avanzato', descrizione: 'Alternativa moderna a C: comptime, allocator e sicurezza.', prerequisiti: ['C'] },

  // --- FRONTEND ---
  { slug: 'javascript', titolo: 'JavaScript', categoria: 'Frontend', anno: '3-5', difficolta: 'base', descrizione: 'Sintassi, DOM, eventi, async, fetch e basi di Node.js.', prerequisiti: [] },
  { slug: 'html', titolo: 'HTML', categoria: 'Frontend', anno: '3-5', difficolta: 'base', descrizione: 'Linguaggio di markup: struttura, semantica, form e accessibilità.', prerequisiti: [] },
  { slug: 'css', titolo: 'CSS', categoria: 'Frontend', anno: '3-5', difficolta: 'base', descrizione: 'Linguaggio di stile: selettori, box model, flexbox, grid e responsive.', prerequisiti: ['HTML'] },
  { slug: 'webassembly', titolo: 'WebAssembly', categoria: 'Frontend', anno: '4-5', difficolta: 'avanzato', descrizione: 'Formato binario portabile, WAT testuale e integrazione con JS.', prerequisiti: ['C'] },
  { slug: 'actionscript', titolo: 'ActionScript', categoria: 'Frontend', anno: '4-5', difficolta: 'intermedio', descrizione: 'Linguaggio storico di Flash: contesto, sintassi e limiti attuali.', prerequisiti: ['JavaScript'] },

  // --- SQL ---
  { slug: 'mysql', titolo: 'MySQL', categoria: 'SQL', anno: '3-5', difficolta: 'base', descrizione: 'Installazione, query, JOIN, indici, viste, utenti e backup.', prerequisiti: [] },
  { slug: 'postgresql', titolo: 'PostgreSQL', categoria: 'SQL', anno: '3-5', difficolta: 'intermedio', descrizione: 'Query avanzate, JSON, transazioni, indici e estensioni.', prerequisiti: ['MySQL'] },
  { slug: 'sqlite', titolo: 'SQLite', categoria: 'SQL', anno: '3-5', difficolta: 'base', descrizione: 'Database embedded: file singolo, uso in app e limiti.', prerequisiti: [] },
  { slug: 'sql-server', titolo: 'Microsoft SQL Server', categoria: 'SQL', anno: '4-5', difficolta: 'intermedio', descrizione: 'T-SQL, stored procedure, indici e integrazione con .NET.', prerequisiti: ['MySQL'] },
  { slug: 'oracle', titolo: 'Oracle Database', categoria: 'SQL', anno: '4-5', difficolta: 'avanzato', descrizione: 'PL/SQL, tablespace, gestione utenti e ambienti enterprise.', prerequisiti: ['SQL di base'] },
  { slug: 'mariadb', titolo: 'MariaDB', categoria: 'SQL', anno: '3-5', difficolta: 'base', descrizione: 'Fork di MySQL: compatibilità, differenze e casi d\u2019uso.', prerequisiti: ['MySQL'] },

  // --- NOSQL ---
  { slug: 'mongodb', titolo: 'MongoDB', categoria: 'NoSQL', anno: '4-5', difficolta: 'intermedio', descrizione: 'Documenti BSON, query, aggregation pipeline e indici.', prerequisiti: [] },
  { slug: 'redis', titolo: 'Redis', categoria: 'NoSQL', anno: '4-5', difficolta: 'intermedio', descrizione: 'Database in-memory: stringhe, hash, liste, pub/sub e cache.', prerequisiti: [] },
  { slug: 'cassandra', titolo: 'Cassandra', categoria: 'NoSQL', anno: '4-5', difficolta: 'avanzato', descrizione: 'Database distribuito a colonne, CQL, replicazione e tuning.', prerequisiti: ['SQL di base'] },
  { slug: 'neo4j', titolo: 'Neo4j', categoria: 'NoSQL', anno: '4-5', difficolta: 'avanzato', descrizione: 'Database a grafi: nodi, relazioni, Cypher e casi d\u2019uso.', prerequisiti: [] },
  { slug: 'couchdb', titolo: 'CouchDB', categoria: 'NoSQL', anno: '4-5', difficolta: 'intermedio', descrizione: 'Documenti JSON, viste MapReduce, replicazione e HTTP API.', prerequisiti: [] },
  { slug: 'dynamodb', titolo: 'DynamoDB', categoria: 'NoSQL', anno: '4-5', difficolta: 'avanzato', descrizione: 'Database gestito AWS: chiavi, indici, throughput e costi.', prerequisiti: [] },
  { slug: 'firebase', titolo: 'Firebase Realtime Database', categoria: 'NoSQL', anno: '3-5', difficolta: 'intermedio', descrizione: 'Database in tempo reale, regole di sicurezza e SDK JS.', prerequisiti: ['JavaScript'] },

  // --- SISTEMI ---
  { slug: 'bash', titolo: 'Bash e Shell Scripting', categoria: 'Sistemi', anno: '3-5', difficolta: 'intermedio', descrizione: 'Comandi, pipe, variabili, script, permessi e automazione.', prerequisiti: [] },
  { slug: 'powershell', titolo: 'PowerShell', categoria: 'Sistemi', anno: '3-5', difficolta: 'intermedio', descrizione: 'Cmdlet, pipeline di oggetti, script e automazione Windows.', prerequisiti: [] },
  { slug: 'assembly', titolo: 'Assembly (x86 e ARM)', categoria: 'Sistemi', anno: '4-5', difficolta: 'avanzato', descrizione: 'Registri, istruzioni, stack, chiamate e differenze tra architetture.', prerequisiti: ['C'] },
  { slug: 'vhdl-verilog', titolo: 'VHDL e Verilog', categoria: 'Sistemi', anno: '4-5', difficolta: 'avanzato', descrizione: 'Progettazione digitale, moduli, testbench e sintesi su FPGA.', prerequisiti: ['Elettronica di base'] },

  // --- STORICI ---
  { slug: 'r', titolo: 'R', categoria: 'Storici', anno: '4-5', difficolta: 'intermedio', descrizione: 'Analisi statistica, dataframe, ggplot2 e report con R Markdown.', prerequisiti: [] },
  { slug: 'matlab', titolo: 'MATLAB', categoria: 'Storici', anno: '4-5', difficolta: 'intermedio', descrizione: 'Calcolo numerico, matrici, plotting e Simulink.', prerequisiti: [] },
  { slug: 'julia', titolo: 'Julia', categoria: 'Storici', anno: '4-5', difficolta: 'avanzato', descrizione: 'Calcolo scientifico veloce, dispatch multiplo e pacchetti.', prerequisiti: [] },
  { slug: 'cobol', titolo: 'COBOL', categoria: 'Storici', anno: '5', difficolta: 'intermedio', descrizione: 'Linguaggio storico per mainframe: contesto, sintassi e limiti.', prerequisiti: [] },
  { slug: 'fortran', titolo: 'Fortran', categoria: 'Storici', anno: '4-5', difficolta: 'intermedio', descrizione: 'Linguaggio storico per calcolo scientifico, ancora usato in HPC.', prerequisiti: [] },
  { slug: 'vbnet', titolo: 'Visual Basic .NET', categoria: 'Storici', anno: '4-5', difficolta: 'base', descrizione: 'Sintassi, Windows Forms, eventi e contesto attuale in .NET.', prerequisiti: [] },
  { slug: 'objective-c', titolo: 'Objective-C', categoria: 'Storici', anno: '5', difficolta: 'avanzato', descrizione: 'Linguaggio storico di macOS/iOS, prima di Swift.', prerequisiti: ['C'] },
  { slug: 'groovy', titolo: 'Groovy', categoria: 'Storici', anno: '4-5', difficolta: 'intermedio', descrizione: 'Linguaggio dinamico su JVM, scripting e Gradle.', prerequisiti: ['Java'] },
]

export function getCorso(slug: string): Corso | undefined {
  return corsi.find((c) => c.slug === slug)
}

export const categorie: Categoria[] = [
  'Office',
  'Linguaggi',
  'Frontend',
  'SQL',
  'NoSQL',
  'Sistemi',
  'Storici',
]