import {
  Box,
  Button,
  Modal,
  Image,
  Text,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  HStack,
} from "@chakra-ui/react"

const ExploreModal = ({ catch_random_pokemon }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  // Retrieve explore Pokemon data
  // Todo: Need refactor
  let retrieveData = JSON.parse(localStorage.getItem("explorePokemon"))
  let pokemonName = ""
  let pokemonUrl = ""
  let pokemonType = ""
  let pokemonHp = ""
  let pokemonAtt = ""
  let pokemonDef = ""
  let pokemonSpatt = ""
  let pokemonSpdef = ""
  let pokemonSpeed = ""
  let pokemonLevel = ""
  let headerMsg = "Oops, There is no Pokemon in the Wild "

  if (retrieveData) {
    pokemonName = retrieveData.poke_info.name ? retrieveData.poke_info.name : ""
    pokemonType = retrieveData.poke_type ? retrieveData.poke_type : ""
    pokemonUrl = retrieveData.poke_info.img ? retrieveData.poke_info.img : ""
    pokemonHp = retrieveData.poke_stats[0].base_stat
      ? retrieveData.poke_stats[0].base_stat
      : ""
    pokemonAtt = retrieveData.poke_stats[1].base_stat
      ? retrieveData.poke_stats[1].base_stat
      : ""
    pokemonDef = retrieveData.poke_stats[2].base_stat
      ? retrieveData.poke_stats[2].base_stat
      : ""

    pokemonSpatt = retrieveData.poke_stats[3].base_stat
      ? retrieveData.poke_stats[3].base_stat
      : ""

    pokemonSpdef = retrieveData.poke_stats[4].base_stat
      ? retrieveData.poke_stats[4].base_stat
      : ""

    pokemonSpeed = retrieveData.poke_stats[5].base_stat
      ? retrieveData.poke_stats[5].base_stat
      : ""

    pokemonLevel = retrieveData.pokemon_Level ? retrieveData.pokemon_Level : 100

    headerMsg = retrieveData ? "Woohoo~~You found a wild Pokemon!" : headerMsg
    // For Debug
    console.log("Retrievedata for pokemon", retrieveData)
  }

  return (
    <>
      <Button onClick={onOpen} colorScheme="teal" size="lg">
        Explore
      </Button>
      <Modal isOpen={isOpen} size="md" onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{headerMsg}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack background="#EDF2F7">
              <Box>
                <Image src={pokemonUrl} />
              </Box>
              <Box>
                <Text
                  fontSize="25px"
                  fontWeight="semibold"
                  textTransform="uppercase"
                  position="center"
                >
                  {pokemonName}
                </Text>
                <Text as="samp" fontSize="16px">
                  Type: {pokemonType}
                  <br></br>
                  Level: {pokemonLevel}
                  <br></br>
                  HP: {pokemonHp}
                  <br></br>
                  Attack: {pokemonAtt}
                  <br></br>
                  Defense: {pokemonDef}
                  <br></br>
                  Sp. Att: {pokemonSpatt}
                  <br></br>
                  Sp. Def: {pokemonSpdef}
                  <br></br>
                  Speed: {pokemonSpeed}
                </Text>{" "}
              </Box>
            </HStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={catch_random_pokemon}>
              Catch
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ExploreModal
