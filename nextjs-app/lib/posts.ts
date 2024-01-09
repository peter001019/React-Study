import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')
//console.log('process.cwd()', process.cwd());
//console.log('postsDirectory', postsDirectory);

export function getSortedPostsData() {
  // /posts 파일 이름을 잡아주기
  const fileNames = fs.readdirSync(postsDirectory)
  //console.log('fileNames', fileNames);
  //fileNames [ 'pre-rendering.md', 'ssg-ssr.md ]
  const allPostsData = fileNames.map(fileName => {
    //파일 이름에서 ".md"를 제거하여 id를 얻음
    const id = fileName.replace(/\.md$/, '') //=[ pre-rendering, ssg-ssr ]
    //markdown 파일 문자열로 읽음
    const fullPath = path.join(postsDirectory, fileName) //파일까지 오는 경로 
    const fileContents = fs.readFileSync(fullPath, 'utf8') //파일 읽기

    //gray-matter 라이브러리 이용해 파일을 parsing
    const matterResult = matter(fileContents) 

    return {
        id, 
        ...matterResult.data as { date: string; title: string }
    }
  })

  return allPostsData.sort((a, b) => {
    if(a.date < b.date) {
        return 1
    } else {
        return -1
    }
  })
}
