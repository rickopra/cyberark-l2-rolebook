const fs = require('fs');
let rd = fs.readFileSync('rolebook-assets/reference-data.js', 'utf8');

if(!rd.includes('window.REFERENCE_DATA.sources')) {
  let ins = window.REFERENCE_DATA.sources=[
    {id:'CA-DOCS-15.2',title:'CyberArk PAM Self-Hosted Documentation',publisher:'CyberArk',type:'Primary',url:'https://docs.cyberark.com/',accessed:'2026-08-04'},
    {id:'CA-INSTALL-15.2',title:'PAM Installation Requirements',publisher:'CyberArk',type:'Primary',url:'https://docs.cyberark.com/',accessed:'2026-08-04'},
    {id:'CA-PSM',title:'Native Privileged Session Management',publisher:'CyberArk',type:'Primary',url:'https://www.cyberark.com/',accessed:'2026-08-04'},
    {id:'NIST-800-53R5',title:'NIST SP 800-53 Rev. 5',publisher:'NIST',type:'Standard',url:'https://csrc.nist.gov/',accessed:'2026-08-04'},
    {id:'NIST-800-61R3',title:'NIST SP 800-61 Rev. 3',publisher:'NIST',type:'Standard',url:'https://csrc.nist.gov/',accessed:'2026-08-04'},
    {id:'NIST-800-63B4',title:'NIST SP 800-63B-4',publisher:'NIST',type:'Standard',url:'https://csrc.nist.gov/',accessed:'2026-08-04'},
    {id:'CIS-8.1',title:'CIS Critical Security Controls 8.1',publisher:'CIS',type:'Standard',url:'https://www.cisecurity.org/',accessed:'2026-08-04'},
    {id:'LOCAL-RICKO',title:'L2 Support Engineer Rolebook (Ricko)',publisher:'Local',type:'Supplemental',url:'#',accessed:'2026-08-04'}
  ];
  ;
  rd = rd.replace('window.REFERENCE_DATA={entries:[', ins + 'window.REFERENCE_DATA={entries:[');
  fs.writeFileSync('rolebook-assets/reference-data.js', rd);
}
console.log('sources injected');
