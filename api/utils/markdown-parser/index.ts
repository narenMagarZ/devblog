

function markdownParser(markdown:string):string{
     let result = markdown
     // for heading
     result = result.replace(/^(#+)(.*)/gm,(match,p1,p2)=>{
          const level = p1.length
          return `<h${level}>${p2.trim()}</h${level}>`
     })
     // for bold
     result = result.replace(/\*\*([^\*]+)\*\*/g,
     `<strong>$1</strong>`)
     // for itallic 
     result = result.replace(/_([^_]+)_/g,
     '<em>$1</em>')

     // for quotes
     result = result.replace(/^>\s(.+\n)*.+$/gm,(match,p1,p2)=>{
          return `<blockquote>${match.trim()}</blockquote>`
     })

     result = result.replace(/```(\w*)\n([\s\S]*?)\n```/g, 
     '<pre><code class="$1">$2</code></pre>');
     // for code 
     result = result.replace(/`([^`]+)`/g,
     '<code>$1</code>')

     // for image uploads 
     result = result.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1"/>');

     // for link
     result = result.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

     // for embed link
     result = result.replace(/{%\s+embed\s+([^%\s]+)\s*%}/g, '<iframe src="$1"></iframe>');

     // for ordered list 
     result = result.replace(/^(\d+\..*)$/gm,
     '<ol><li>$1</li><ol>')


     // for unordered list 
     result = result.replace(/^(-)(.+)$/gm,
     '<ul><li>$2</li></ul>')
     result = result.replace(/\n/g,'<br/>')
     return result

}

// const ans = markdownParser(`
// ### this is heading
// _magar2_
// **bold** _gurung_
// _magar_
// **bold2** 
// \`
// let x =343;
// let y =343;
// \`
// >
// this is block quote what are this thing
// fdfd
// jfjaslkd
// fsadjfla
// fadsflj
// adflaj

// ![this is image](https://localhost:5000/img)

// {% embed https://facebook.com %}


// \`\`\`

// let a = 343;
// let b = 343;
// \`\`\`



// 1. naren
// 2. magar

// - naren
// - magar
// `)
// console.log(ans)

export default markdownParser