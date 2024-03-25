import { View, ImageBackground } from 'react-native';
import { Icon, Text } from '@rneui/themed'
import { getForegroundColor, getIconName } from '../../Util/StyleUtil'
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

export const PolicyCard =({ item })=>(
<ImageBackground 
    source={require('../../assets/cardBackground.png')}
    style={{  resizeMode:'contain', width:280, height: 160 }}
    imageStyle={{ borderRadius: 6 }}>
    <CardContainer>
        <CardRow>
            <CardText> { item?.code ?? '' }</CardText> 
            <CardText> { item && <Icon 
                size={27} 
                type='material-community' 
                name={ getIconName(item.end) }
                color={ getForegroundColor(item.end) } /> 
            } </CardText> 
        </CardRow>
        <CardRow>
            <CardText> { item ? (item.currency + ' ' +Number(item.insuredSum).toLocaleString()) : '' } </CardText>
            <CardText> { item ? (item.active ? 'ACTIVE' : 'INACTIVE') : '' } </CardText>
        </CardRow>
    </CardContainer>
</ImageBackground>
)