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
  const [dataCaught, setDataCaught] = useState<boolean>();

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" sx={{ paddingTop: 5, paddingBottom: 5 }}>
        <Paper
          sx={{
            p: 2,
            background: "#ff781d",
          }}
        >
          <Box
            sx={{
              alignContent: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "#F7E7CE" }}
            >
              QR Code Reader
            </Typography>
            <Box sx={{ width: "100vw", padding: 5 }}>
              <QrReader
                containerStyle={{ background: "#F7E7CE" }}
                videoId="video"
                scanDelay={1000}
                onResult={(result?: Result | null, error?: Error | null) => {
                  if (result) {
                    setData(result);
                    setDataCaught(true);
                  } else {
                    setDataCaught(false);
                  }

                  if (error) {
                    console.info(error);
                    setError(error);
                  }
                }}
                constraints={{ facingMode: "environment" }}
                ViewFinder={dataCaught ? ViewFinderGreen : ViewFinder}
              />
            </Box>
          </Box>
          <Stack spacing={2}>
            <Box sx={{ color: "#F7E7CE" }}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Result:
              </Typography>
              <Box
                sx={{
                  maxHeight: 400,
                  paddingTop: 1,
                  overflow: "auto",
                }}
              >
                <Typography variant="h6">Text:</Typography>
                <Typography variant="body1" sx={{ color: "white" }}>
                  <code> {data && data?.getText()}</code>
                </Typography>
                <Typography variant="h6">Details:</Typography>
                <Typography variant="body1">
                  <code> {JSON.stringify(data, null, 2)}</code>
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
