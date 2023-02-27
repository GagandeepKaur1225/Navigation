import { useRoute} from '@react-navigation/core';
import React, { useEffect,useState } from 'react'
import { View, Text,StyleSheet,TextInput,TouchableOpacity,FlatList } from 'react-native'

const Screen_navigated = ({ navigation,route }) => {
    const params = useRoute();
    const name = route.params.item.name;
    console.log(name);
    console.log(route, "hello");
    const [stringsearch, setStringsearch] = useState('');
    const [similaritem, setSimilaritem] = useState([]);
    const [datawhole, setDatawhole] = useState([]);
    useEffect(() => {
        var requestOptions = {
            method: 'POST',
            redirect: 'follow',
            body: JSON.stringify({
                country: name,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
        };

      
        fetch("https://countriesnow.space/api/v0.1/countries/cities", requestOptions)
            .then(response => response.json())
            .then((res) => {
                console.log(res);
                setDatawhole(res?.data);
                setSimilaritem(res?.data);
                console.log(datawhole);
                console.log(similaritem);
            })
  .catch(error => console.log('error', error));
        
    }, []);
    const filteringItems = (value) => {
        console.log("inside filter ");
        if (value) {
            console.log("displaying similar")
            console.log(similaritem);
            console.log(datawhole);
            function filterdemo(item)  {
                console.log("in filter function");
               return item.toLowerCase().indexOf(value.toLowerCase()) > -1 ? 1 : 0;
            }
            const newItem = datawhole.filter(filterdemo);
            console.log(newItem);
            setSimilaritem(newItem);
            console.log(similaritem);
            // setStringsearch(value);
        }
        else {
            // setSimilaritem(value);
            setStringsearch("");
        }
    }
    let timer;
    const debounce = (func) => {
        return function (...args) {
            const context = this;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                func.apply(context, args);
            }, 500);
        };
    };
    const optimizedFn = (val) => {
        console.log(val, "value changed");
        (debounce(filteringItems(val)), []);
        setStringsearch(val);

    };
    const ItemView = ({item} ) => {
        // console.log(item,"SIMILAR");
        
        return (<View>
            <TouchableOpacity style={style.textStyle}
                onPress={() =>
                    getItem(item)

                }
            ><Text>
                {item}
               
                </Text> 
             </TouchableOpacity>
        </View>);
    };
    const getItem = (item) => {

        alert(item);
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
                <Text style={style.heading}>SELECT ANY CITY</Text>
                <TextInput
                    style={style.textinp}
                    onChangeText={(val) => optimizedFn(val)
                    }
                    // value={stringsearch}
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



