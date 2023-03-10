import React, { useState, useEffect,useCallback } from 'react'
import { View, Text, StyleSheet, TextInput, FlatList,TouchableOpacity } from 'react-native'
import { useNavigation} from '@react-navigation/native';


const Screen_main = () => {
    const navigation=useNavigation()
    const [stringsearch, setStringsearch] = useState('');
    const [similaritem, setSimilaritem] = useState([]);
    const [datawhole, setDatawhole] = useState([]);
    
    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("https://countriesnow.space/api/v0.1/countries/capital", requestOptions)
            .then(response => response.text())
              .then(result => {
                  resultparse = JSON.parse(result);
                  console.log(JSON.parse(result), "RESULT",
                  );
                  setSimilaritem(resultparse?.data);
                setDatawhole(resultparse?.data);
              })
              .catch(error => console.log('error', error));
    },[]);
    const filteringItems = (value) => {
        
        if (value) {
            console.log("displaying similar")
            console.log(similaritem);
            console.log(datawhole);
            function filterdemo(item)  {
                console.log("in filter function");
               return item?.name.toLowerCase().indexOf(value.toLowerCase()) > -1 ? 1 : 0;
            }
            const newItem = datawhole.filter(filterdemo);
            console.log(newItem);
            setSimilaritem(newItem);
            console.log(similaritem);
            setStringsearch(value);
        }
        else if(value == ""){
            setSimilaritem(datawhole);
        }
        else {
            //IndsetSimilaritem(value);
            setStringsearch("");
        }
    }
    useEffect(() => {
        const getData = setTimeout(() =>
            //    { setStringsearch(value);
            filteringItems(stringsearch),
            500);
        console.log(stringsearch);
        
        return () => clearTimeout(getData)
    }, [stringsearch])

    const ItemView = ({item} ) => {
        // console.log(item,"SIMILAR");
        
        return (<View>
            <TouchableOpacity style={style.textStyle}
                onPress={() =>
                    navigation.navigate('Screen_for_cities', {item:item})
                    
                }
                ><Text>
                {item?.name}
                  
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
                <Text style={style.heading}>SELECT ANY COUNTRY</Text>
                <TextInput
                    style={style.textinp}
                    onChangeText={(value) => setStringsearch(value)
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

export default Screen_main
const style = StyleSheet.create(
    {
        view_style: {
            width: '100%',
            alignItems: 'center',
            height: 800,
            marginTop: 30
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
            padding: 10,
            width: 350
        },
        heading: {
            padding: 10,
        }
    }
    )
    // function debounce(value, delay) {
        //     const [debounceValue, setDebounceValue] = useState[value];
        //     useEffect(() => {
            //         const handler = setTimeout(() => {
                //             setDebounceValue(value);
                //         }, delay);
                //         return (() => {
                    //             clearTimeout(handler);
                    //         })
                    //     }, [value, delay]);
                    //     return debounceValue;
                    // }
                    // useEffect(() =>
                    //     const timer=setTimeout()
                    // )
                    // useEffect(() => {
                        //     const timer = setTimeout(() => filteringItems(stringsearch), 1000);
                        //     return () => clearTimeout(timer);
                        //   }, [stringsearch]);
                        // const debounce = (func) => {
                        //     let timer;
                        //     return function (...args) {
                        //         const context = this;
                        //         if (timer) clearTimeout(timer);
                        //         timer = setTimeout(() => {
                        //             timer = null;
                        //             func.apply(context, args);
                        //         }, 100);
                        //     };
                        // };
                        // const optimizedFn = (val) => {
                        //     console.log(val, "value changed")
                        //     // setStringsearch(val);
                        //     (debounce(filteringItems(val)), []);
                        
                        // };