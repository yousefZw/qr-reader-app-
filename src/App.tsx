import {
  Box,
  Container,
  CssBaseline,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { QrReader } from "react-qr-reader";
import { ViewFinder } from "./component/ViewFinder";
import { Result } from "@zxing/library";
import { ViewFinderGreen } from "./component/ViewFinderGreen";

function App() {
  const [data, setData] = useState<Result>();
  const [error, setError] = useState<Error>();

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" sx={{ paddingTop: 5, paddingBottom: 5 }}>
        <Paper
          sx={{
            p: 2,
            alignContent: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "#ff781d",
          }}
        >
          <Typography
            variant="h2"
            sx={{ fontWeight: "bold", color: "#F7E7CE" }}
          >
            QR Code Reader
          </Typography>
          <Stack spacing={2}>
            <Box sx={{ width: 400, paddingTop: 5 }}>
              <QrReader
                containerStyle={{ background: "#F7E7CE" }}
                videoId="video"
                scanDelay={1000}
                onResult={(result?: Result | null, error?: Error | null) => {
                  if (result) {
                    setData(result);
                  }

                  if (error) {
                    console.info(error);
                    setError(error);
                  }
                }}
                constraints={{ facingMode: "environment" }}
                ViewFinder={data ? ViewFinderGreen : ViewFinder}
              />
            </Box>
            <Box sx={{ color: "#F7E7CE" }}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Result:
              </Typography>
              <Box
                sx={{
                  maxHeight: 400,
                  paddingTop: 1,
                  overflow: "auto",
                  maxWidth: 400,
                }}
              >
                <Typography variant="h6">Text:</Typography>
                <Typography variant="body1">
                  {data && data?.getText()}
                </Typography>
                <Typography variant="h6">Details:</Typography>
                <Typography variant="body1">
                  {JSON.stringify(data, null, 2)}
                </Typography>
                {error && <Typography variant="h4">{error.message}</Typography>}
              </Box>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </>
  );
}

export default App;
