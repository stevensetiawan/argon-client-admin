'use client';

import * as React from 'react';
import { Avatar, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Grid from '@mui/material/Unstable_Grid2';

export function EmployeeAddForm(): React.JSX.Element {
  const [image, setImage] = React.useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result as string;
        setImage(imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Full name</InputLabel>
                <OutlinedInput defaultValue="Sofia" label="Full name" name="firstName" />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput defaultValue="sofia@devias.io" label="Email address" name="email" />
              </FormControl>
            </Grid>

            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Position</InputLabel>
                <OutlinedInput label="Position" />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Phone number</InputLabel>
                <OutlinedInput label="Phone number" name="phone" type="tel" />
              </FormControl>
            </Grid>
            <Grid md={2} xs={12}>
              <FormControl fullWidth>
                <Stack gap={3} alignItems="center">
                  {image ? (
                    <div>
                      <Avatar src={image} sx={{ height: '80px', width: '80px' }} />
                    </div>
                  ) : null}
                  <Button component="label" fullWidth variant="outlined">
                    Upload picture
                    <input type="file" hidden onChange={handleImageChange} />
                  </Button>
                </Stack>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained">Save</Button>
        </CardActions>
      </Card>
    </form>
  );
}
