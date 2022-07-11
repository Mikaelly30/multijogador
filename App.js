import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default class App extends Component{
  constructor() {
    super();
    this.state = {
      clima: '', 
    };
  }

  obterClima = async () => {
    //alterar latitude and longitude
    var url = 'https://fcc-weather-api.glitch.me/api/current?lat=35&lon=139';
    return fetch(url)
      .then((resposta) => resposta.json())
      .then((respostaJson) => {
        this.setState({
          clima: respostaJson,
        });
      })
      .catch((erro) => {
        console.error(erro);
      });
  };
  componentDidMount = () => {
    this.obterClima();
  };

  render() {
    if (this.state.clima === '') {
      return (
        <View style={styles.title}>
          <Text>Carregando...</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.subContainer}>
            <Text style={styles.title}>Previsão do Tempo</Text>
            <Image style={styles.cloudImage} source={require('./nuvem.png')} />

            <View style={styles.textContainer}>
              <Text style={{ fontSize: 18 }}>
                {this.state.clima.main.temp}&deg;C
              </Text>
              <Text style={{ fontSize: 20, margin: 10 }}>
                humidade : {this.state.clima.main.humidity}
              </Text>
              <Text style={{ fontSize: 20 }}>
                {this.state.clima.weather[0].description}
              </Text> 
            </View>
            
            <Image style = {styles.weatherIcon} source={{uri: this.state.clima.weather[0].icon}} />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    borderWidth: 1,
    alignItems: 'center',
  },
  title: {
    marginTop: 50,
    fontSize: 30,
    fontWeight: '500',
  },
  cloudImage: {
    width: 200,
    height: 200,
    marginTop: 30,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: -150,
  },
  weatherIcon: {
    marginTop: 580,
     width: 100,
     height:100,
    position: "absolute"
  }
});

