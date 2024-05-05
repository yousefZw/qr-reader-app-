import {
  Box,
  Container,
  CssBaseline,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { QrReader } from "react-qr-reader";
import { Result } from "@zxing/library";
import { ViewFinder } from "./component/ViewFinder";

const isLink = (str?: string): boolean => {
  if (!str) return false;
  return str.startsWith("http://") || str.startsWith("https://");
};

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
              QR Code Scanner
            </Typography>
            <Box sx={{ width: "100vw", padding: 5 }}>
              <QrReader
                containerStyle={{ background: "#F7E7CE" }}
                videoId="video"
                scanDelay={1000}
                onResult={(result?: Result | null, error?: Error | null) => {
                  if (result) {
                    setData(result);
                  }
                  setDataCaught(!!result);

                  if (error) {
                    console.info(error);
                    setError(error);
                  }
                }}
                constraints={{ facingMode: "environment" }}
                ViewFinder={() => (
                  <ViewFinder
                    color={
                      dataCaught
                        ? "rgba(73, 255, 0, 0.7)"
                        : "rgba(255, 0, 0, 0.5)"
                    }
                  />
                )}
              />
            </Box>
          </Box>
          <Stack spacing={2}>
            <Box sx={{ color: "#F7E7CE" }}>
              <Box
                sx={{
                  maxHeight: 400,
                  paddingTop: 1,
                  overflow: "auto",
                }}
              >
                <Typography variant="h6">Text:</Typography>
                <Typography variant="body1" sx={{ color: "white" }}>
                  {isLink(data?.getText()) ? (
                    <Link
                      href={data?.getText()}
                      underline="always"
                      target="_blank"
                      color={"primary"}
                    >
                      {data?.getText()}
                    </Link>
                  ) : (
                    <code> {data && data?.getText()}</code>
                  )}
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
