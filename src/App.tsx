import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/main-layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import AdminsOperators from "./pages/users/AdminsOperators";
import Agents from "./pages/users/Agents";
import ClinicStaff from "./pages/users/ClinicStaff";
import UserTrainingCenters from "./pages/users/TrainingCenters";
import WorkerRegistration from "./pages/workers/WorkerRegistration";
import WorkerManagement from "./pages/workers/WorkerManagement";
import WorkerProgress from "./pages/workers/WorkerProgress";
import ClinicRegistration from "./pages/clinics/ClinicRegistration";
import ClinicLicenses from "./pages/clinics/ClinicLicenses";
import ClinicAudits from "./pages/clinics/ClinicAudits";
import TrainingCenters from "./pages/TrainingCenters";
import Approvals from "./pages/Approvals";
import Integrations from "./pages/Integrations";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          } />
          <Route path="/users/admins" element={
            <MainLayout>
              <AdminsOperators />
            </MainLayout>
          } />
          <Route path="/users/agents" element={
            <MainLayout>
              <Agents />
            </MainLayout>
          } />
          <Route path="/users/clinics" element={
            <MainLayout>
              <ClinicStaff />
            </MainLayout>
          } />
          <Route path="/users/training" element={
            <MainLayout>
              <UserTrainingCenters />
            </MainLayout>
          } />
          <Route path="/workers/register" element={
            <MainLayout>
              <WorkerRegistration />
            </MainLayout>
          } />
          <Route path="/workers/manage" element={
            <MainLayout>
              <WorkerManagement />
            </MainLayout>
          } />
          <Route path="/workers/progress" element={
            <MainLayout>
              <WorkerProgress />
            </MainLayout>
          } />
          <Route path="/clinics/register" element={
            <MainLayout>
              <ClinicRegistration />
            </MainLayout>
          } />
          <Route path="/clinics/licenses" element={
            <MainLayout>
              <ClinicLicenses />
            </MainLayout>
          } />
          <Route path="/clinics/audits" element={
            <MainLayout>
              <ClinicAudits />
            </MainLayout>
          } />
          <Route path="/training-centers" element={
            <MainLayout>
              <TrainingCenters />
            </MainLayout>
          } />
          <Route path="/approvals" element={
            <MainLayout>
              <Approvals />
            </MainLayout>
          } />
          <Route path="/integrations" element={
            <MainLayout>
              <Integrations />
            </MainLayout>
          } />
          <Route path="/reports" element={
            <MainLayout>
              <Reports />
            </MainLayout>
          } />
          <Route path="/settings" element={
            <MainLayout>
              <Settings />
            </MainLayout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
