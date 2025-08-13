pipeline {
    agent any

    stages {
        stage('Install dependencies') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install'
            }
        }

        stage('Run tests') {
            steps {
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            // Arquiva os traces gerados
            archiveArtifacts artifacts: '**/trace.zip', allowEmptyArchive: true
        }
        failure {
            // Opcional: salva screenshots ou relatórios em caso de falha
            archiveArtifacts artifacts: '**/*.png, **/playwright-report/**', allowEmptyArchive: true
        }
    }
}