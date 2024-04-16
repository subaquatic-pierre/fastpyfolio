import React, { useState } from 'react';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Alert, Box, Button, Checkbox, CircularProgress, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { ContactApi } from 'lib/api';

const blankData = { email: '', phone: '', name: '', message: '', nameError: '', emailError: '' };

function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ message: string; color: string } | null>(null);
  const [formData, setFormData] = useState(blankData);
  const theme = useTheme();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((old) => ({
      ...old,
      nameError: '',
      emailError: '',
      [e.target.name]: e.target.value
    }));
  };

  const validateForm = (formData) => {
    if (!formData.email || !formData.name) {
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    const contactApi = new ContactApi();

    const valid = validateForm(formData);
    if (!valid) {
      setFormData((old) => ({
        ...old,
        nameError: 'Name required',
        emailError: 'Email required'
      }));
      setAlert({ message: 'Please ensure all fields are filled on the form', color: 'error' });

      return;
    }
    try {
      setLoading(true);
      await contactApi.submitContactForm(formData);

      setAlert({ message: 'Contact message sent successfully', color: 'success' });
    } catch (e) {
      console.debug(e);
      setAlert({ message: 'There was an error, try again later', color: 'error' });
    } finally {
      setFormData(blankData);
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: { xs: 2.5, sm: 0 } }} data-aos="fade-up">
      <Grid container spacing={5} justifyContent="center">
        <Grid item xs={12} sm={10} lg={9}>
          <Stack alignItems="center" justifyContent="center" spacing={2}>
            <Button variant="text" sx={{ p: 0, textTransform: 'none', '&:hover': { bgcolor: 'transparent' } }}>
              Get In touch
            </Button>
            <Typography align="center" variant="h2">
              Contact
            </Typography>
            <Typography variant="caption" align="center" color="textSecondary" sx={{ maxWidth: '355px' }}>
              Looking to connect? Feel free to reach out with any questions, feedback, or just to say hello.
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={10} lg={9}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                type="text"
                error={!!formData.nameError}
                name="name"
                onChange={handleInputChange}
                value={formData.name}
                placeholder="Name"
                sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="email"
                onChange={handleInputChange}
                value={formData.email}
                error={!!formData.emailError}
                placeholder="Email Address"
                sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="phone"
                onChange={handleInputChange}
                value={formData.phone}
                placeholder="Phone Number"
                sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                name="message"
                onChange={handleInputChange}
                value={formData.message}
                rows={4}
                placeholder="Message"
                sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={10} lg={9}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1 }}
            justifyContent="space-between"
            alignItems={{ xs: 'stretch', sm: 'center' }}
          >
            <Stack direction="row" alignItems="center" sx={{ ml: -1 }}></Stack>
            {loading ? (
              <CircularProgress />
            ) : (
              <Button onClick={handleSubmit} variant="contained" sx={{ ml: { xs: 0 } }}>
                Submit Now
              </Button>
            )}
          </Stack>
        </Grid>
      </Grid>
      <Box position="static">
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={!!alert}
          onClose={() => setAlert(null)}
          autoHideDuration={6000}
          color={alert?.color}
          message={alert?.message}
        >
          <Alert onClose={() => setAlert(null)} severity={alert?.color as any} variant="filled" sx={{ width: '100%' }}>
            {alert?.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}

export default ContactForm;
