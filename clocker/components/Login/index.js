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
        FormHelperText } from '@chakra-ui/react';
import { Logo } from '../Logo';
import firebase, { persistenceMode } from './../../config/firebase';
import { useEffect } from 'react';

const validationSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('Preenchimento obrigatório'),
  password: yup.string().required('Preenchimento obrigatório')
});

export const Login = () =>  {
  const { values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit } = useFormik({
    onSubmit: async (values, form) => { 
      firebase.auth().setPersistence(persistenceMode);

      try {
        const user =  await firebase.auth().signInWithEmailAndPassword(values.email, values.password);
        console.log("OK", user)
        console.log("OK_USER", firebase.auth().currentUser)
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

  // useEffect(() =>{
  //   console.log("Sessao ativa", firebase.auth().currentUser)
  // }, []);

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

        <Box p={4}>
          <Button 
            width="100%" 
            onClick={handleSubmit} 
            isLoading={isSubmitting}
            colorScheme="blue"
          >Entrar</Button>
        </Box>
      </Box>
      <Link href="/signup">Ainda não tem uma conta? Cadastre-se.</Link>
    </Container>
  )
}
