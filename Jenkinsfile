pipeline {
    agent any

    stages {
        stage('Install dependencies') {
            steps {
                // Install project dependencies and Playwright browsers
                sh 'npm ci'
                sh 'npx playwright install'
            }
        }

        stage('Run tests') {
            steps {
                // Run Playwright tests
                sh 'npx playwright test'

                // List all files and folders to help locate artifacts
                sh 'ls -R > structure.txt'
                archiveArtifacts artifacts: 'structure.txt'
            }
        }
    }

    post {
        always {
            // Archive traces, videos, screenshots and reports
            archiveArtifacts artifacts: '**/trace.zip, **/*.webm, **/*.png, **/test-results/**, **/playwright-report/**', allowEmptyArchive: true
        }
        failure {
            // Optionally archive additional artifacts on failure
            archiveArtifacts artifacts: '**/*.png, **/playwright-report/**', allowEmptyArchive: true
        }
    }
}