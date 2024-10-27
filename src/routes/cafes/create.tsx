import { Button, FormControl, Stack, TextField } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cafes/create")({
  component: CreateCafe,
});

function CreateCafe() {
  return (
    <form>
      <FormControl>
        <TextField id="name" label="Name" variant="standard" required />
        <TextField
          id="description"
          label="Description"
          variant="standard"
          required
        />
        <TextField id="location" label="Location" variant="standard" required />
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" color="primary">
            Cancel
          </Button>
          <Button variant="contained" color="primary">
            Submit
          </Button>
        </Stack>
      </FormControl>
    </form>
  );
}
