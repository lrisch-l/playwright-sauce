pipeline {
    agent any

    stages {
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Playwright tests') {
            steps {
                sh 'npx playwright test'
            }
        }

        stage('Generate test report') {
            steps {
                sh 'npx playwright show-report'
            }
        }
    }
}
