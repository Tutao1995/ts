// ts -> .d.ts (翻译文件) -> js

import fs from 'fs'
import path from 'path'
import superagent from 'superagent'    //类似于ajax 发送请求
import Analyzer from './analyzer'
export interface AnalyzerInterface {
    analyze: (html: string, filePath:string) => string
}
class Crowller {
    private filePath = path.resolve(__dirname,'../data/course.json');
    /**
     * @name getRawHtml  // 湖片区爬取的页面的html架构
     */
    private async getRawHtml(){
        const result = await superagent.get(this.url);
        return result.text;
    }
    /**
     * @name writeFile   //将获取到的内容写入指定的路径下
     * @param path //爬取的文件内容存放路径
     * @param content   //对应的爬取的存放的内容用
     */
    private writeFile(path:string,content: string){
        fs.writeFileSync(path,content)
    }
    /**
     * @name initSpiderProcess   //初始化爬虫程序
     */
    private async initSpiderProcess(){
        const html = await this.getRawHtml();
        const outputContent = this.analyzer.analyze(html, this.filePath);
        this.writeFile(this.filePath,outputContent)
    }
    constructor(private url: string, private analyzer: AnalyzerInterface){
        this.initSpiderProcess();
    }
}
const secret = 'secretKey';
const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`
let analyzer = Analyzer.getInstaance();
new Crowller(url, analyzer);
