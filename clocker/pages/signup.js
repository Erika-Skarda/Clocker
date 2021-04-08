import { useFormik } from 'formik';
import * as yup from 'yup';
import Link from 'next/link';
import { 
        Container, 
        Box, 
        Input, 
        Button, 
        Text, 
        FormControl, 
        FormLabel, 
        InputGroup,
        InputLeftAddon,
        FormHelperText } from '@chakra-ui/react';
import { Logo } from '../components';
import firebase from './../config/firebase';

const validationSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('Preenchimento obrigatório'),
  password: yup.string().required('Preenchimento obrigatório'),
  username: yup.string().required('Preenchimento obrigatório')
});

export default function Home() {
  const { values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit } = useFormik({
    onSubmit: async (values, form) => { 
      try {
        const user =  await firebase.auth().createUserWithEmailAndPassword(values.email, values.password);
        console.log("OK", user)
      } catch(error) {
        console.log('ERRROR',  error)
      }
    },
    validationSchema,
    initialValues: {
      email: '',
      username: '',
      password: ' '
    }
  });
  return (
    <Container centerContent p={4}>
      <Logo />
      <Box p={4} mt={8}>
        <Text>Crie sua agenda compartilhada.</Text>
      </Box>
      <Box>
        <FormControl id="email" p={4} isRequired>
          <FormLabel>Email</FormLabel>
            <Input 
              onBlur={handleBlur} 
              onChange={handleChange} 
              value={values.email} 
              type="email" 
              size="lg"
            />
            {touched.email && <FormHelperText textColor="#e74c3c">{errors.email}</FormHelperText>}
        </FormControl>
        <FormControl id="password" p={4}  isRequired>
          <FormLabel>Senha</FormLabel>
            <Input 
              onBlur={handleBlur} 
              onChange={handleChange} 
              value={values.password} 
              type="password" 
              size="lg"
            />
            {touched.password && <FormHelperText textColor="#e74c3c">{errors.password}</FormHelperText>}
        </FormControl>

        <FormControl id="username" p={4} isRequired>
          <InputGroup size="lg">
            <InputLeftAddon children="clocker.work/" />
            <Input 
                onBlur={handleBlur} 
                onChange={handleChange} 
                value={values.username} 
                type="username" 
                size="lg"
              />
            </InputGroup>
            {touched.username && <FormHelperText textColor="#e74c3c">{errors.username}</FormHelperText>}
          </FormControl>
 

        <Box p={4}>
          <Button 
            width="100%" 
            onClick={handleSubmit} 
            isLoading={isSubmitting}
            colorScheme="blue"
          >Entrar</Button>
        </Box>
      </Box>

      <Link href="/">Já tem uma conta? Acesse.</Link>
    </Container>
  )
}
