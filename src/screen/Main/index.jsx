import React, { useState, useEffect } from "react";
import { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text, TextInput, View, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "./globalStyles";
import { AntDesign } from "@expo/vector-icons";
import {
  Box,
  Button,
  ButtonText,
  Center,
  ChevronDownIcon,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Icon,
  Input,
  InputField,
  SelectBackdrop,
  SelectContent,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@gluestack-ui/themed";
import { Select } from "@gluestack-ui/themed";

export default function Main() {
  const [moedaOrigem, setMoedaOrigem] = useState("BRL");
  const [moedaDestino, setMoedaDestino] = useState("USD");
  const [valorConvertido, setValorConvertido] = useState("");
  const [valorOriginal, setValorOriginal] = useState("99.99999");

  const buscarHandle = async () => {
    let URL = `https://economia.awesomeapi.com.br/last/${moedaOrigem}-${moedaDestino}`;
    // setValorConvertido(URL)
    try {
      let page = await fetch(URL);
      let json = await page.json();
      console.log(json);
      let indice = parseFloat(json[`${moedaOrigem}${moedaDestino}`].high);
      // setValorConvertido(indice)
      console.log(indice);
      let valor = parseFloat(valorOriginal);
      let resu = (indice * valor).toFixed(2);
      setValorConvertido(resu);
      // console.log(json[`USDBRL`].high)
    } catch (error) {
      setValorConvertido(`Erro: ${error.message}`);
    }
  };
  const limparResultado = () => {
    setValorConvertido("");
    setValorOriginal("33.3333");
    setMoedaOrigem("BRL");
    setMoedaDestino("USD");
  };
  return (
    <Box p="$2" h={"#full"} w={"#full"} borderRadius={"$md"} display='flex' justifyContent='center' alignSelf='center'>
      <Center h={"$full"}>
        <FormControl>
          <Text style={styles.title}>Conversor de moedas</Text>
          <FormControlLabel>
            <FormControlLabelText>Moeda de Origem</FormControlLabelText>
          </FormControlLabel>

          <Input>
            <Select
              w={"$full"}
              selectedLabel={moedaOrigem}
              onValueChange={(itemValue, itemIndex) =>
                setMoedaOrigem(itemValue)
              }
            >
              <SelectTrigger variant="outline" size="md">
                <SelectInput placeholder="selecione uma opção" />
                <SelectIcon>
                  <Icon as={ChevronDownIcon} />
                </SelectIcon>
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectItem label="Real Brasileiro" value="BRL" />
                  <SelectItem label="Dolar Americano" value="USD" />
                  <SelectItem label="Peso Argentino" value="ARS" />
                  <SelectItem label="Libra Estrelinha" value="GBP" />
                  <SelectItem label="Euro" value="EUR" />
                </SelectContent>
              </SelectPortal>
            </Select>
          </Input>

          <FormControlLabel mt={"$2"}>
            <FormControlLabelText>Moeda de Destino</FormControlLabelText>
          </FormControlLabel>

          <Input>
            <Select
              w={"$full"}
              selectedLabel={moedaDestino}
              onValueChange={(itemValue, itemIndex) =>
                setMoedaDestino(itemValue)
              }
            >
              <SelectTrigger variant="outline" size="md">
                <SelectInput placeholder="selecione uma opção" />
                <SelectIcon>
                  <Icon as={ChevronDownIcon} />
                </SelectIcon>
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectItem label="Real Brasileiro" value="BRL" />
                  <SelectItem label="Dolar Americano" value="USD" />
                  <SelectItem label="Peso Argentino" value="ARS" />
                  <SelectItem label="Libra Estrelinha" value="GBP" />
                  <SelectItem label="Euro" value="EUR" />
                </SelectContent>
              </SelectPortal>
            </Select>
          </Input>

          <FormControlLabel mt={"$2"}>
            <FormControlLabelText>Valor a ser convertido</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              keyboardType="numeric"
              value={valorOriginal}
              onChangeText={setValorOriginal}
            />
          </Input>
          <Box>
            <Button onPress={buscarHandle} mt={"$2"} bg="#27a445">
              <ButtonText>Converter</ButtonText>
            </Button>
            <Button onPress={limparResultado} mt={"$2"} bg="#27a445">
              <ButtonText>Limpar</ButtonText>
            </Button>
          </Box>
          <Box
            mt={"$2"}
            flexDirection="row"
            justifyContent="space-between"
            h={"$12"}
            alignItems="center"
            p={"$3"}
            bg="$amber300"
            borderRadius={"$md"}
          >
            <Text>Resultado:</Text>
            <Text>{valorConvertido}</Text>
          </Box>
        </FormControl>
      </Center>
    </Box>
  );
}
