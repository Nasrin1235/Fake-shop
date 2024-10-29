import { useParams } from 'react-router-dom';


export default function Category() {
  const {category} = useParams()
  return `hallo ${category}`
}