class ShowService{
    constructor(datas){
        this.datas = datas;
        this.outcome = {};
        this.getTotalAmount();
        this.getCompanyTotalAmount();
        this.getCompanyTaxableAmount();
        this.getCompanyTaxesAmount();
    };
    getTotalAmount(){
        this.outcome.total = 0;
        for (let i = 0; i < this.datas.length; i++) {
            let stringToNumber = parseFloat(this.datas[i].amount);
            this.outcome.total = this.outcome.total + stringToNumber;
        }
    };
    getCompanyTotalAmount(){
        let cta = ((this.outcome.total * 60)/ 100).toFixed(2);
        this.outcome.companyTotal = cta;
    }
    getCompanyTaxableAmount(){
        let ctaxa = (this.outcome.companyTotal/1.1).toFixed(2);
        this.outcome.companyTaxable = ctaxa;
    };
    getCompanyTaxesAmount(){
        let ctaxes = (this.outcome.companyTotal - this.outcome.companyTaxable).toFixed(2);
        this.outcome.companyTaxes = ctaxes;
    };
};

module.exports = ShowService;