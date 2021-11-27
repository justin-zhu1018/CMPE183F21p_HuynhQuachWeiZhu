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
  let headerMsg = "Oops, There is no Pokemon in the Wild "
  let pokemonName = retrieveData.poke_info.name
    ? retrieveData.poke_info.name
    : ""
  let pokemonType = retrieveData.poke_type ? retrieveData.poke_type : ""
  let pokemonUrl = retrieveData.poke_info.img ? retrieveData.poke_info.img : ""
  let pokemonHp = retrieveData.poke_stats[0].base_stat
    ? retrieveData.poke_stats[0].base_stat
    : ""
  let pokemonAtt = retrieveData.poke_stats[1].base_stat
    ? retrieveData.poke_stats[1].base_stat
    : ""
  let pokemonDef = retrieveData.poke_stats[2].base_stat
    ? retrieveData.poke_stats[2].base_stat
    : ""

  let pokemonSpatt = retrieveData.poke_stats[3].base_stat
    ? retrieveData.poke_stats[3].base_stat
    : ""

  let pokemonSpdef = retrieveData.poke_stats[4].base_stat
    ? retrieveData.poke_stats[4].base_stat
    : ""

  let pokemonSpeed = retrieveData.poke_stats[5].base_stat
    ? retrieveData.poke_stats[5].base_stat
    : ""

  let pokemonLevel = retrieveData.pokemon_Level
    ? retrieveData.pokemon_Level
    : 100

  headerMsg = retrieveData ? "Woohoo~~You found a wild Pokemon!" : headerMsg

  // For Debug
  console.log("Retrievedata for pokemon", retrieveData)

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
                  Speed: {pokemonSpeed}
                  <br></br>
                  Attack: {pokemonAtt}
                  <br></br>
                  Defense: {pokemonDef}
                  <br></br>
                  Special Attack: {pokemonSpatt}
                  <br></br>
                  Speical Defense: {pokemonSpdef}
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
