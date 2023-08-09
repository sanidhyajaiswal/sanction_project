export interface Transaction {
    _id: string,
    agencyName: string,
    contractNumber: string,
    contractValue: number,
    transaction: [
        {
        _id : string,
        transNo: string ,
        date: string ,
        amount: number ,
        },
    ],
    remainingBudget: number
}