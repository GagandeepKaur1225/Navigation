import { useRoute} from '@react-navigation/core';
import React, { useEffect,useState } from 'react'
import { View, Text,StyleSheet,TextInput,TouchableOpacity,Flatlist } from 'react-native'

const Screen_navigated = ({ navigation,route }) => {
    const params = useRoute();
    console.log(route, "hello");
    const [stringsearch, setStringsearch] = useState('');
    const [similaritem, setSimilaritem] = useState([]);
    const [datawhole, setDatawhole] = useState([]);
    useEffect(() => {
        var requestOptions = {
            method: 'POST',
            redirect: 'follow',
            country:route.params.item.name,
        };

        fetch("https://countriesnow.space/api/v0.1/countries/capital", requestOptions)
            .then(response => response.text())
            .then(result => {
                resultparse = JSON.parse(result);
                console.log(JSON.parse(result), "RESULT");
                setSimilaritem(resultparse?.data);
                setDatawhole(resultparse?.data);
            }
                )
            .catch(error => console.log('error', error));
    }, []);
    const filteringItems = (value) => {
        
        if (value) {
            console.log("displaying similar")
            console.log(similaritem);
            console.log(datawhole);
            function filterdemo(item)  {
                console.log("in filter function");
               return item?.capital.toLowerCase().indexOf(value.toLowerCase()) > -1 ? 1 : 0;
            }
            const newItem = datawhole.filter(filterdemo);
            console.log(newItem);
            setSimilaritem(newItem);
            console.log(similaritem);
            setStringsearch(value);
        }
        else {
            setSimilaritem(value);
            setStringsearch(value);
        }
    }
    const ItemView = ({item} ) => {
        // console.log(item,"SIMILAR");
        
        return (<View>
            <TouchableOpacity style={style.textStyle}
                onPress={() =>
                    getItem()

                }
            ><Text>
                {item?.name}
                {'.'}
                </Text> 
             </TouchableOpacity>
        </View>);
    };
    const getItem = (item) => {

        alert( item?.capital);
    };
    const ItemSeparatorView = () => {
        return (
          
          <View
                style={style.itemview}
          />
        );
      };
    
    return (
        <View style={{flex:1}}>
            <View style={style.view_style}>
                <Text style={style.heading}>SELECT ANY CAPITAL</Text>
                <TextInput
                    style={style.textinp}
                    onChangeText={(val) => filteringItems(val)
                    }
                    value={stringsearch}
                    placeholder="search here" />
                {console.log(similaritem, 'similaritem?.data')}
                <View style={{flex:1}}>
                <FlatList
                    data={similaritem}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={ItemSeparatorView}
                    renderItem={ItemView}
                    />
                </View>
                    
            </View>
        </View>
    )
}

export default Screen_navigated
const style = StyleSheet.create(
    {
        view_style: {
            width: '100%',
            alignItems: 'center',
            height: 800,
            marginTop: 30,
            // flex: 1
        },
        textinp: {
            height: 40,
            width: "90%",
            borderRadius: 4,
            borderWidth: 2, padding: 10,
            marginBottom:20
        },
        itemview: {
            
            height: 0.5,
            width: '100%',
            backgroundColor: '#C8C8C8',
        },
        textStyle: {
            flex:1,
            borderWidth: 1,
            borderRadius:2,
            height: 50,
            padding:10,width:350
        },
        heading: {
            padding: 10,
        }
    }
)



