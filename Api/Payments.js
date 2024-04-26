import { DoCmd } from './doCmd'
export const getPaymentMethods = async(id, products, token)=>{
    try {
        //Search product code
        const LoadEntity = await DoCmd({cmd:'LoadEntity', data:{ entity:'LifePolicy', filter:`id IN (SELECT lifePolicyId FROM PayPlan WHERE id=${id})`, fields:'productCode'}, token});
        const { outData:{ productCode }} = LoadEntity;
        // Find the product
        const Product = products.find(pro => pro.code == productCode);
        // Product Options
        const Options = Product?.config?.SelfService?.MobilePayment?.Options ?? [];
        for( const opt of Options){
            if( typeof opt.formId != 'undefined' && opt.formId != null)
                opt.htmlForm = await getHTMLForm(opt.formId, token)
        }
        return Options;
    } catch (error) {
        throw error
    }
}
const getHTMLForm=async(formId, token)=>{
    const RepoChain = await DoCmd({cmd:'RepoChain',data:{ operation:'GET', filter:`id=${ formId }` }, token });
    if(RepoChain.outData)
        return RepoChain.outData[0].code
    return `<h2> Form Not Configured </h2>`
}