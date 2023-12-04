import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

const AlphabetNav = ({
  products,
  onLetterPress,
}: {
  products: any;
  onLetterPress: any;
}) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const productLetters = products.map((p: { name: string[] }) =>
    p.name[0].toUpperCase()
  );

  return (
    <View style={styles.alphabetNav}>
      {alphabet.map((letter) => {
        const isActive = productLetters.includes(letter);
        return (
          <TouchableOpacity
            key={letter}
            disabled={!isActive}
            onPress={() => onLetterPress(letter)}
          >
            <Text
              style={isActive ? styles.activeLetter : styles.inactiveLetter}
            >
              {letter}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  alphabetNav: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 10,
  },
  activeLetter: {
    fontSize: 20, // Adjust font size as needed
    margin: 2,
    padding: 5,
    backgroundColor: "blue",
    color: "white",
    borderRadius: 5,
  },
  inactiveLetter: {
    fontSize: 20, // Adjust font size as needed
    margin: 2,
    padding: 5,
    backgroundColor: "grey",
    borderRadius: 5,
  },
});

export default AlphabetNav;
