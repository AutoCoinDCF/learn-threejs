import Supporter1 from './supporter1'

export default class Supporter{
    constructor(scr = null){
        this.scr = scr;
        this.supporterList = [];
        this.initPosition = [0, 0, 0]
    }

    init(scr = null){
        if(scr) this.setScr(scr)
        this.addNextSupporter();
        let cSupporter = this.addNextSupporter();
        this.scr.setCameraToSupporter(cSupporter)
        // this.scr.render()
    }

    addNextSupporter(animationGroup = null){
        let supporterCount = this.supporterList.length
        let newPosition = this.initPosition;
        let moveDis = Math.random() * 10 + 10
        if(supporterCount > 0){
            let currentPosition = this.supporterList[supporterCount - 1].getBottomPosition()
            newPosition = [currentPosition[0] + moveDis, currentPosition[1], currentPosition[2]]
        }
        let supporter = new Supporter1(this.scr, newPosition, animationGroup);
        this.supporterList.push(supporter)
        return supporter
    }

    setScr(scr){
        this.scr = scr
    }

    getFocusSupporter(){
        let length = this.supporterList.length;
        return length >= 2 ? this.supporterList[length - 2] : null
    }
}