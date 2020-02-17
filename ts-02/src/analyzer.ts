import fs from 'fs'
import cheerio from 'cheerio'   // 类似于jquery  获取界面元素
import { AnalyzerInterface } from './crowller' 
interface Course {
    title: string,
    count: number
}
interface CourseResult {
    time: number,
    data: Course[]
}
interface OutputContent {
    [propname:number]:Course[]
}
export default class Analyzer implements AnalyzerInterface{
    private static instance:Analyzer;
    /**
     * @name getInstaance   //  单例模式的实例获取
     */
    static getInstaance(){
        if(!this.instance){
            this.instance = new Analyzer();
        }
        return this.instance;
    }
    /**
     * @name getCourseInfo  //解析爬虫的html
     * @param html //待解析的html
     */
    private getCourseInfo(html: string){
        const $ = cheerio.load(html);
        const courseInfos: Course[] = [];
        const courseItems = $('.course-item');
        courseItems.map( (index, element) => {
            const descs = $(element).find('.course-desc');
            const title = descs.eq(0).text();
            const count = +descs.eq(1).text().split('：')[1];
            courseInfos.push({
                title: title,
                count: count
            })
        });
        return {
            time:new Date().getTime(),
            data:courseInfos
        }
    }
    /**
     * @name generateJsonContent // 处理将要写入的内容
     * @param content   //内容
     * @param path    // 写入的路径
     */
    private generateJsonContent(content: CourseResult, path: string){
        let outputContent: OutputContent = {};
        if(fs.existsSync(path)){
            let fileContent = fs.readFileSync(path, 'utf-8');
            outputContent = JSON.parse(fileContent);
        }
        outputContent[content.time] = content.data;
        return outputContent;  
    }
    public analyze(html: string,path: string){
        const courseResult = this.getCourseInfo(html);
        const outputContent = this.generateJsonContent(courseResult, path);
        return JSON.stringify(outputContent);
    }
    private constructor(){}
}