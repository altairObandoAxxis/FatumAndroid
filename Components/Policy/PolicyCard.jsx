import { View, ImageBackground } from 'react-native';
import { Icon, Text, useTheme } from '@rneui/themed'
import { getForegroundColorList, getIconName } from '../../Util/StyleUtil'
export const CardText=( props )=>(
<Text style={{ color: 'white',fontSize: 18 }} {...props}>
    { props.children }
</Text>
)
export const CardRow=(props)=>(
<View style={{ display: 'flex', flexDirection:'row', flex: 1, justifyContent:'space-between', padding: 10}} {...props}>
    { props.children }
</View>)
export const CardContainer=(props)=>(
    <View style={{ display: 'flex', flexDirection:'column', flex: 1, justifyContent:'space-between', gap:70 }} {...props}>
        { props.children }
    </View>
)

export const PolicyCard =({ item })=>{
    const { theme } = useTheme();
return (
<ImageBackground 
    source={require('../../assets/cardBackground.png')}
    style={{  resizeMode:'contain', width:280, height: 160 }}
    imageStyle={{ borderRadius: 6 }}>
    <CardContainer>
        <CardRow>
            <View style={{ flex: 1, height: 30,justifyContent: 'center'  }}>
                <CardText> { item?.code ?? '' }</CardText> 
            </View>
            <View style={{ 
                backgroundColor: theme.colors.white, 
                flexDirection:'row-reverse', 
                height: 30, width: 33,
                borderRadius: 25, }}>
                <CardText style={{ justifyContent: 'center' }}> <Icon 
                    size={27} 
                    type='material-community' 
                    name={ item && item!= null ? getIconName(item.end) : 'shield-check-outline' }
                    color={ item && item!= null ? getForegroundColorList({ endDate: item.end, theme }) : theme.colors.primary } />  </CardText> 
            </View>
        </CardRow>
        <CardRow>
            <CardText> { item ? (item.currency + ' ' +Number(item.insuredSum).toLocaleString()) : '' } </CardText>
            <CardText> { item ? (item.active ? 'ACTIVE' : 'INACTIVE') : '' } </CardText>
        </CardRow>
    </CardContainer>
</ImageBackground>
)}