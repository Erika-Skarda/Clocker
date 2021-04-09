import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
import { Logo, useAuth } from '../components';

const validationSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('Preenchimento obrigatório'),
  password: yup.string().required('Preenchimento obrigatório'),
  username: yup.string().required('Preenchimento obrigatório')
});

export default function Home() {
  const [auth, { signup }] = useAuth();
  const router = useRouter();
  
  const { values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit 
  } = useFormik({
    onSubmit: signup,
    validationSchema,
    initialValues: {
      email: '',
      username: '',
      password: ' '
    }
  });

  useEffect(() => {
    auth.user && router.push('/agenda')
  }, [auth.user]);

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
