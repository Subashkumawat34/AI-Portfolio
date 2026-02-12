import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    GitBranch,
    UploadCloud,
    Server,
    Clock,
    Activity,
    CheckCircle,
    ExternalLink,
    Loader2,
    Terminal,
    Zap
} from 'lucide-react';
import '../styles/DeploymentStatus.css';

const DeploymentStatus = ({ currentStep, deploymentUrl, error }) => {
    const scrollRef = useRef(null);

    // Auto-scroll to bottom as new steps appear
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [currentStep]);

    // Define steps
    const steps = [
        { id: 1, label: 'Initializing Git Repository...', icon: GitBranch },
        { id: 2, label: 'Pushing Code to GitHub...', icon: UploadCloud },
        { id: 3, label: 'Triggering Vercel Build...', icon: Server },
        { id: 4, label: 'Building & Deploying...', icon: Clock },
        { id: 5, label: 'Verifying Deployment Status...', icon: Activity },
        { id: 6, label: 'Deployment Successful!', icon: CheckCircle },
    ];

    // Helper to determine status
    const getStepStatus = (stepId) => {
        if (error && stepId === currentStep) return 'error';
        if (currentStep > stepId) return 'completed';
        if (currentStep === stepId) return 'active';
        return 'pending';
    };

    return (
        <motion.div
            className="deployment-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Outer Light Orange Box */}
            <div className="deployment-box">

                {/* Header Section inside Box */}
                <div className="box-header">
                    <div className="header-icon-wrapper">
                        <Zap size={28} color="#ff8c00" fill="#ff8c00" />
                    </div>
                    <div>
                        <h2>{error ? 'Deployment Halted' : 'Deploying Your Portfolio'}</h2>
                        <p>Sit back while our AI constructs your digital presence.</p>
                    </div>
                </div>

                {/* Inner Terminal Screen */}
                <div className="terminal-screen" ref={scrollRef}>
                    <div className="terminal-header">
                        <div className="window-dots">
                            <span className="dot red"></span>
                            <span className="dot yellow"></span>
                            <span className="dot green"></span>
                        </div>
                        <span className="terminal-title">bash -- verbose</span>
                    </div>

                    <div className="terminal-content">
                        <AnimatePresence>
                            {steps.map((step) => {
                                const status = getStepStatus(step.id);
                                // Only show steps that have started (active or completed) or the immediate next pending one? 
                                // User request: "first step is comming after the completing running step the second step is comming"
                                // Implementation: We show all steps strictly up to currentStep.

                                if (step.id > currentStep) return null;

                                const Icon = step.icon;

                                return (
                                    <motion.div
                                        key={step.id}
                                        className={`terminal-line ${status}`}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    >
                                        <span className="timestamp">[{new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>

                                        <div className="line-icon">
                                            {status === 'active' ? <Loader2 size={16} className="spin" /> :
                                                status === 'completed' ? <CheckCircle size={16} className="text-green" /> :
                                                    status === 'error' ? <Activity size={16} className="text-red" /> : <Icon size={16} />}
                                        </div>

                                        <span className="line-text">
                                            {step.label}
                                            {status === 'active' && <span className="cursor">_</span>}
                                        </span>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>

                        {error && (
                            <motion.div
                                className="terminal-error"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <span className="error-msg">Error: {error}</span>
                                <button onClick={() => window.location.reload()} className="btn-terminal-retry">
                                    $ retry_deployment
                                </button>
                            </motion.div>
                        )}

                        {currentStep === 6 && !error && (
                            <motion.div
                                className="terminal-success"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="success-divider-line"></div>
                                <div className="success-msg">DEPLOYMENT COMPLETE</div>
                                <div className="success-sub">Redirecting to Success Page...</div>
                                <div className="success-divider-line"></div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div >
    );
};

export default DeploymentStatus;
