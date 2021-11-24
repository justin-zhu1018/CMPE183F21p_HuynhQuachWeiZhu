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
  VStack,
  HStack,
} from "@chakra-ui/react"

const ExploreModal = ({ catch_random_pokemon }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  // Retrieve explore Pokemon data
  let retrieveData = JSON.parse(localStorage.getItem("explorePokemon"))
  let headerMsg = "Oops, There is no Pokemon in the Wild "
  let pokemonName = retrieveData.name ? retrieveData.name : ""
  let pokemonType = retrieveData.poke_type ? retrieveData.poke_type : ""
  let pokemonUrl = retrieveData.poke_info.img ? retrieveData.poke_info.img : ""
  let pokemonHp = retrieveData.poke_stats[0].base_stat
    ? retrieveData.poke_stats[0].base_stat
    : ""
  headerMsg = retrieveData ? "Woohoo~~You found a wild Pokemon!" : headerMsg

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
            <HStack>
              <Box>
                <Text
                  fontSize="25px"
                  fontWeight="semibold"
                  textTransform="uppercase"
                  position="center"
                >
                  {pokemonName}
                </Text>
                <Image src={pokemonUrl} />
              </Box>
              <Box>
                <Text fontSize="20px">Type: {pokemonType}</Text>
                <Text>HP: {pokemonHp} </Text>
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
