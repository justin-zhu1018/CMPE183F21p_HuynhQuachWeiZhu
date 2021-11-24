import {
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
} from "@chakra-ui/react"
import { useDisclosure } from "@chakra-ui/react"

const ExploreModal = ({ catch_random_pokemon }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  let pokemonName = ""
  let pokemonUrl = ""
  let headerMsg = "Oops, There is no Pokemon in the Wild "
  let retrieveData = JSON.parse(localStorage.getItem("explorePokemon"))

  if (retrieveData) {
    console.log(retrieveData)
    pokemonName = retrieveData.poke_info.name
    pokemonUrl = retrieveData.poke_info.img
    headerMsg = "Woohoo~~You found a wild Pokemon!"
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
            <Text
              fontSize="25px"
              fontWeight="semibold"
              textTransform="uppercase"
              position="center"
            >
              {pokemonName}
            </Text>
            <Image src={pokemonUrl} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={catch_random_pokemon}>Catch</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ExploreModal
