import * as React from "react";
import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Divider,
  Link,
  Container,
  Stack,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  Business as BusinessIcon,
} from "@mui/icons-material";

interface OMSLoginProps {
  onLogin: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
}

export default function OMSLogin({ onLogin }: OMSLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginMethod, setLoginMethod] = useState<"email" | "otp">("email");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await onLogin(email, password);
      if (!result.success) {
        setError(result.error || "Login failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Card
          elevation={24}
          sx={{
            borderRadius: 3,
            overflow: "visible",
            position: "relative",
          }}
        >
          <Box
            sx={{
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              height: 120,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              borderRadius: "12px 12px 0 0",
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <BusinessIcon sx={{ fontSize: 40 }} />
              <Typography variant="h4" fontWeight="bold">
                Order Management
              </Typography>
            </Stack>
          </Box>

          <CardContent sx={{ p: 4, pt: 3 }}>
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              sx={{ color: "text.primary", fontWeight: 500, mb: 3 }}
            >
              Welcome Back
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Box sx={{ mb: 3 }}>
              <Stack direction="row" spacing={1} justifyContent="center">
                <Button
                  variant={loginMethod === "email" ? "contained" : "outlined"}
                  onClick={() => setLoginMethod("email")}
                  size="small"
                >
                  Email/Password
                </Button>
                <Button
                  variant={loginMethod === "otp" ? "contained" : "outlined"}
                  onClick={() => setLoginMethod("otp")}
                  size="small"
                >
                  OTP Login
                </Button>
              </Stack>
            </Box>

            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="user@company.com"
                />

                {loginMethod === "email" && (
                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    variant="outlined"
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleTogglePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    fontSize: "1rem",
                    fontWeight: "bold",
                    borderRadius: 2,
                    background:
                      "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                    "&:hover": {
                      background:
                        "linear-gradient(45deg, #1976D2 30%, #1976D2 90%)",
                    },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : loginMethod === "email" ? (
                    "Sign In"
                  ) : (
                    "Send OTP"
                  )}
                </Button>
              </Stack>
            </form>

            <Divider sx={{ my: 3 }} />

            <Stack spacing={2} alignItems="center">
              <Link href="#" variant="body2" color="primary">
                Forgot your password?
              </Link>

              <Typography variant="body2" color="text.secondary" align="center">
                Demo Credentials:
              </Typography>
              <Stack direction="row" spacing={2} sx={{ fontSize: "0.875rem" }}>
                <Box>
                  <Typography variant="caption" display="block" color="primary">
                    ACME Corp: user@acme.com
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" display="block" color="primary">
                    TechFlow: user@techflow.com
                  </Typography>
                </Box>
              </Stack>
              <Typography variant="caption" color="text.secondary">
                Password: any value
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
