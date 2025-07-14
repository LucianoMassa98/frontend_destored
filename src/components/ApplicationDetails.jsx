// components/ApplicationDetails.jsx
import React, { useState } from 'react';
import { useApplicationActions } from '../hooks/useApplications';
import { useAuth } from '../utils/AuthContext';
import Loader from './Loader';
import Notification from './Notification';

const ApplicationDetails = ({ application, onUpdate, onClose }) => {
  const { user } = useAuth();
  const { 
    loading, 
    error, 
    evaluateApplication, 
    approveApplication, 
    rejectApplication, 
    withdrawApplication,
    calculatePriority,
    setError 
  } = useApplicationActions();

  const [showEvaluateForm, setShowEvaluateForm] = useState(false);
  const [showApproveForm, setShowApproveForm] = useState(false);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [showWithdrawForm, setShowWithdrawForm] = useState(false);
  const [notification, setNotification] = useState(null);

  const [evaluationData, setEvaluationData] = useState({
    priority_score: application?.priority_score || 0,
    client_feedback: '',
    metadata: {}
  });

  const [approvalData, setApprovalData] = useState({
    client_feedback: '',
    final_rate: application?.proposed_rate || 0,
    rate_negotiation_notes: ''
  });

  const [rejectionData, setRejectionData] = useState({
    reason: '',
    client_feedback: '',
    send_feedback_email: true
  });

  const [withdrawalData, setWithdrawalData] = useState({
    reason: ''
  });

  const getStatusColor = (status) => {
    const statusColors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'under_review': 'bg-blue-100 text-blue-800',
      'accepted': 'bg-green-100 text-green-800',
      'rejected': 'bg-red-100 text-red-800',
      'withdrawn': 'bg-gray-100 text-gray-800',
      'expired': 'bg-red-100 text-red-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status) => {
    const statusTexts = {
      'pending': 'Pendiente',
      'under_review': 'En Revisión',
      'accepted': 'Aceptada',
      'rejected': 'Rechazada',
      'withdrawn': 'Retirada',
      'expired': 'Expirada'
    };
    return statusTexts[status] || status;
  };

  const canEvaluate = user?.role === 'cliente' && ['pending', 'under_review'].includes(application?.status);
  const canApprove = user?.role === 'cliente' && ['pending', 'under_review'].includes(application?.status);
  const canReject = user?.role === 'cliente' && ['pending', 'under_review'].includes(application?.status);
  const canWithdraw = user?.role === 'profesional' && user?.id === application?.professional_id && ['pending', 'under_review'].includes(application?.status);

  const handleEvaluate = async (e) => {
    e.preventDefault();
    try {
      const response = await evaluateApplication(application.id, evaluationData);
      if (response.success) {
        setNotification({ type: 'success', message: 'Aplicación evaluada exitosamente' });
        setShowEvaluateForm(false);
        if (onUpdate) onUpdate();
      }
    } catch (err) {
      setNotification({ type: 'error', message: err.message });
    }
  };

  const handleApprove = async (e) => {
    e.preventDefault();
    try {
      const response = await approveApplication(application.id, approvalData);
      if (response.success) {
        setNotification({ type: 'success', message: 'Aplicación aprobada exitosamente' });
        setShowApproveForm(false);
        if (onUpdate) onUpdate();
      }
    } catch (err) {
      setNotification({ type: 'error', message: err.message });
    }
  };

  const handleReject = async (e) => {
    e.preventDefault();
    try {
      const response = await rejectApplication(application.id, rejectionData);
      if (response.success) {
        setNotification({ type: 'success', message: 'Aplicación rechazada exitosamente' });
        setShowRejectForm(false);
        if (onUpdate) onUpdate();
      }
    } catch (err) {
      setNotification({ type: 'error', message: err.message });
    }
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    try {
      const response = await withdrawApplication(application.id, withdrawalData);
      if (response.success) {
        setNotification({ type: 'success', message: 'Aplicación retirada exitosamente' });
        setShowWithdrawForm(false);
        if (onUpdate) onUpdate();
      }
    } catch (err) {
      setNotification({ type: 'error', message: err.message });
    }
  };

  const handleCalculatePriority = async () => {
    try {
      const response = await calculatePriority(application.id);
      if (response.success) {
        setNotification({ type: 'success', message: 'Prioridad recalculada exitosamente' });
        if (onUpdate) onUpdate();
      }
    } catch (err) {
      setNotification({ type: 'error', message: err.message });
    }
  };

  if (!application) {
    return (
      <div className="text-center py-8">
        <p>No se encontró la aplicación</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      {loading && <Loader />}

      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Detalles de la Aplicación</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Información General</h3>
          <div className="space-y-3">
            <div>
              <span className="font-medium">Estado:</span>
              <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                {getStatusText(application.status)}
              </span>
            </div>
            <div>
              <span className="font-medium">Tarifa Propuesta:</span>
              <span className="ml-2">${application.proposed_rate}</span>
            </div>
            <div>
              <span className="font-medium">Tiempo Estimado:</span>
              <span className="ml-2">{application.proposed_timeline} días</span>
            </div>
            <div>
              <span className="font-medium">Puntuación de Prioridad:</span>
              <span className="ml-2">{application.priority_score || 0}</span>
            </div>
            <div>
              <span className="font-medium">Fecha de Aplicación:</span>
              <span className="ml-2">{new Date(application.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Carta de Presentación</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 whitespace-pre-wrap">
              {application.cover_letter || 'No se proporcionó carta de presentación'}
            </p>
          </div>
        </div>
      </div>

      {/* Botones de acciones */}
      <div className="flex flex-wrap gap-3 mb-6">
        {canEvaluate && (
          <button
            onClick={() => setShowEvaluateForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Evaluar
          </button>
        )}
        
        {canApprove && (
          <button
            onClick={() => setShowApproveForm(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Aprobar
          </button>
        )}
        
        {canReject && (
          <button
            onClick={() => setShowRejectForm(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Rechazar
          </button>
        )}
        
        {canWithdraw && (
          <button
            onClick={() => setShowWithdrawForm(true)}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Retirar
          </button>
        )}

        {user?.role === 'cliente' && (
          <button
            onClick={handleCalculatePriority}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Recalcular Prioridad
          </button>
        )}
      </div>

      {/* Formulario de Evaluación */}
      {showEvaluateForm && (
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-4">Evaluar Aplicación</h3>
          <form onSubmit={handleEvaluate}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Puntuación de Prioridad (0-100)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={evaluationData.priority_score}
                  onChange={(e) => setEvaluationData(prev => ({
                    ...prev,
                    priority_score: parseInt(e.target.value) || 0
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comentarios del Cliente
              </label>
              <textarea
                value={evaluationData.client_feedback}
                onChange={(e) => setEvaluationData(prev => ({
                  ...prev,
                  client_feedback: e.target.value
                }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                Evaluar
              </button>
              <button
                type="button"
                onClick={() => setShowEvaluateForm(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Formulario de Aprobación */}
      {showApproveForm && (
        <div className="bg-green-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-4">Aprobar Aplicación</h3>
          <form onSubmit={handleApprove}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tarifa Final
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={approvalData.final_rate}
                  onChange={(e) => setApprovalData(prev => ({
                    ...prev,
                    final_rate: parseFloat(e.target.value) || 0
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notas de Negociación
              </label>
              <textarea
                value={approvalData.rate_negotiation_notes}
                onChange={(e) => setApprovalData(prev => ({
                  ...prev,
                  rate_negotiation_notes: e.target.value
                }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comentarios del Cliente
              </label>
              <textarea
                value={approvalData.client_feedback}
                onChange={(e) => setApprovalData(prev => ({
                  ...prev,
                  client_feedback: e.target.value
                }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                Aprobar
              </button>
              <button
                type="button"
                onClick={() => setShowApproveForm(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Formulario de Rechazo */}
      {showRejectForm && (
        <div className="bg-red-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-4">Rechazar Aplicación</h3>
          <form onSubmit={handleReject}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Razón del Rechazo (mínimo 10 caracteres)
              </label>
              <textarea
                value={rejectionData.reason}
                onChange={(e) => setRejectionData(prev => ({
                  ...prev,
                  reason: e.target.value
                }))}
                rows={3}
                minLength={10}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comentarios del Cliente
              </label>
              <textarea
                value={rejectionData.client_feedback}
                onChange={(e) => setRejectionData(prev => ({
                  ...prev,
                  client_feedback: e.target.value
                }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rejectionData.send_feedback_email}
                  onChange={(e) => setRejectionData(prev => ({
                    ...prev,
                    send_feedback_email: e.target.checked
                  }))}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Enviar email de notificación al profesional</span>
              </label>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
              >
                Rechazar
              </button>
              <button
                type="button"
                onClick={() => setShowRejectForm(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Formulario de Retiro */}
      {showWithdrawForm && (
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-4">Retirar Aplicación</h3>
          <form onSubmit={handleWithdraw}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Razón del Retiro
              </label>
              <textarea
                value={withdrawalData.reason}
                onChange={(e) => setWithdrawalData(prev => ({
                  ...prev,
                  reason: e.target.value
                }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50"
              >
                Retirar
              </button>
              <button
                type="button"
                onClick={() => setShowWithdrawForm(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
};

export default ApplicationDetails;
