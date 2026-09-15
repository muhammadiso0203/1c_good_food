export interface IUsers {
    id: number;
    name: string;
    email: string;
    phone: string;
}

export interface IMetrics {
    Totalrevenue: number;
    Incomechange: number;
    Netprofit: number;
    Netprofitchange: number;
    Totalemployees: number;
    Totalemployeeschange: number;
    NumberOfDocuments: number;
    NumberOfDocumentsInSystem: number;
    HiringEmployees: number;
    ChangesInHiring: number;
    DismissalOfEmployees: number;
    ChangesInDismissal: number;
    StaffTurnoverRate: number;
    ExpensesOfThePeriod_9410?: number;
    ExpensesOfThePeriodChange_9410?: number;
    ExpensesOfThePeriod_9420?: number;
    ExpensesOfThePeriodChange_9420?: number;
    ExpensesOfThePeriod_9430?: number;
    ExpensesOfThePeriodChange_9430?: number;
    ExpensesOfThePeriod_9100?: number;
    ExpensesOfThePeriodChange_9100?: number;
    ExpensesOfThePeriod_9610?: number;
    ExpensesOfThePeriodChange_9610?: number;
    ExpensesOfThePeriod_9620?: number;
    ExpensesOfThePeriodChange_9620?: number;
    ExpensesOfThePeriod_9700?: number;
    ExpensesOfThePeriodChange_9700?: number;

    Staff?: number;
    Payroll?: number;
    DynamicsOfFinancialIndicators?: number;
}

export interface IDashboard {
    id: number;
    name: string;
    value: string;
    desc?: string;
}

export interface IFinance {
    ExpensesOfThePeriod_9410?: number;
    ExpensesOfThePeriodChange_9410?: number;
    ExpensesOfThePeriod_9420?: number;
    ExpensesOfThePeriodChange_9420?: number;
    ExpensesOfThePeriod_9430?: number;
    ExpensesOfThePeriodChange_9430?: number;
    ExpensesOfThePeriod_9100?: number;
    ExpensesOfThePeriodChange_9100?: number;
    ExpensesOfThePeriod_9610?: number;
    ExpensesOfThePeriodChange_9610?: number;
    ExpensesOfThePeriod_9620?: number;
    ExpensesOfThePeriodChange_9620?: number;
    ExpensesOfThePeriod_9700?: number;
    ExpensesOfThePeriodChange_9700?: number;
    [key: string]: any; // for dynamic keys like Revenue_*, Expenses_*, MoneyReceipts_*, MoneyPayments_*
}

export type IFinans = IFinance;

export interface Polucheniya {
    id: number;
    name: string;
    value: string;
    desc: string;
}


export interface ISoliqData {
    id: number;
    name: string;
    value: string;
    desc: string;
}

export interface IKadr {
    ВидЗанятости_ВнешнееСовместительство: any;
    ВидЗанятости_ПоДоговоруГражданскоПравовогоХарактера: any;
    ВидЗанятости_ОсновноеМестоРаботы: any;
    ГрафикРаботы_ПятидневнаяСорокоЧасовая: any;
    HiringEmployees: number;
    ChangesInHiring: number;
    DismissalOfEmployees: number;
    ChangesInDismissal: number;
    StaffTurnoverRate: number;
    GenderDistributionMaleGender: number;
    GenderDistributionFemaleGender: number;
    HigherEducation: number;
    MediumSpecialEducation: number;
    SecondaryEducation: number;
    Totalemployees?: number;
    Totalemployeeschange?: number;
    Age_30?: number;
    Age_30_40?: number;
    Age_40_50?: number;
    Age_50_60?: number;
    Age_60?: number;
    ГрафикРаботы_Прочие?: number;
    ВидЗанятости_Прочие?: number;
}