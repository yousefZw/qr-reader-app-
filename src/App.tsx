import { Box, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { QrReader} from "react-qr-reader";
import { ViewFinder } from "./component/ViewFinder";

function App() {
  const [data, setData] = useState<unknown>();
  const [error, setError] = useState<Error>();

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h3">Qr Reader</Typography>
        <Stack spacing={2}>
          <Box sx={{ width: 400 }}>
            <QrReader
              videoId="video"
              scanDelay={1000}
              onResult={(result, error, qrreader) => {
                if (result) {
                  setData(result);
                }

                if (error) {
                  console.info(error);
                  setError(error);
                }
                if (qrreader) {
                  console.info(qrreader);
                }
              }}
              constraints={{ facingMode: "user" }}
              ViewFinder={ViewFinder}
            />
          </Box>
          <Typography variant="h4">{JSON.stringify(data, null, 2)}</Typography>
          {error && <Typography variant="h4">{error.message}</Typography>}
        </Stack>
      </Paper>
    </>
  );
}

export default App;
