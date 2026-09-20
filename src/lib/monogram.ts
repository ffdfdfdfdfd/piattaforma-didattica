export function monogramFor(slug: string, titolo: string): string {
  const overrides: Record<string, string> = {
    python: 'PY', java: 'JV', javascript: 'JS', typescript: 'TS',
    csharp: 'C#', cpp: 'C+', 'sql-server': 'SQL', mariadb: 'MDB',
    'vhdl-verilog': 'VHD', 'objective-c': 'OBJ', vbnet: 'VB',
    'competenze-digitali': 'CD',
    word: 'W', excel: 'X', powerpoint: 'P',
    postgresql: 'PG', mysql: 'MY', sqlite: 'SQ', mongodb: 'MO',
    firebase: 'FB', powershell: 'PS', bash: 'SH', c: 'C',
    webassembly: 'WA', actionscript: 'AS', go: 'GO', rust: 'RS',
    kotlin: 'KT', swift: 'SW', dart: 'DT', scala: 'SC',
    perl: 'PL', elixir: 'EX', clojure: 'CL', haskell: 'HS',
    lua: 'LU', zig: 'ZG', php: 'PHP', ruby: 'RB',
    html: 'HT', css: 'CS', cassandra: 'CA', neo4j: 'N4',
    couchdb: 'CO', dynamodb: 'DY', redis: 'RD',
    assembly: 'ASM', r: 'R', matlab: 'ML', julia: 'JL',
    cobol: 'CB', fortran: 'FT',
    groovy: 'GR', oracle: 'OR',
  }
  return overrides[slug] ?? titolo.substring(0, 2).toUpperCase()
}