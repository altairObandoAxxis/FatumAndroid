import { DoCmd } from "./doCmd"

export const SaveNotificationToken = async ({ userToken, mobileToken, mobileInfo, platform, user })=>{
    // Validate if the configuration exists
    const GetConfig = await DoCmd({ cmd:'GetConfig', data:{ path: '$.Mobile.android' }, token: userToken });
    
    if( !GetConfig.outData.deviceList ){
        console.log('Device list not configured');
        return false;
    }
    if ( !GetConfig.outData.updateDeviceList){
        console.log('No update command chain found');
        return false;
    }
    const ExeChain = await DoCmd({ cmd: 'ExeChain', data: { chain: GetConfig.outData.updateDeviceList, context: JSON.stringify({mobileToken, mobileInfo, platform, user})}, token: userToken });
    return ExeChain.outData;
}