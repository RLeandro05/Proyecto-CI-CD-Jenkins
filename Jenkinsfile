pipeline {
    agent any

    environment {
        NODEJS_HOME = tool 'NodeJS'
        PATH = "${NODEJS_HOME}/bin:${env.PATH}"
        AZURE_APP_NAME = "miapp-angular"  // Nombre de tu App Service en Azure
        RESOURCE_GROUP = "mi-recurso"
    }

    stages {
        stage('Clonar Repositorio') {
            steps {
                git branch: 'Fernando', url: 'https://github.com/RLeandro05/Proyecto-CI-CD-Jenkins.git'
            }
        }

        stage('Instalar Dependencias') {
            steps {
                sh 'npm install'
                /*sh '''
                npm cache clean --force
                npm uninstall -g @angular/cli || true
                rm -rf /var/jenkins_home/tools/jenkins.plugins.nodejs.tools.NodeJSInstallation/NodeJS/lib/node_modules/@angular
                npm install -g @angular/cli
                '''*/
                sh 'npm install -g @angular/cli'
                sh 'npm install puppeteer --save-dev'
               
            }
        }
       

        stage('Ejecutar Pruebas') {
            steps {
                 sh 'ng test --watch=false --browsers=ChromeHeadless'
                //sh 'find / --name ng'
            }
        }

        stage('Construir Aplicación') {
            steps {
                sh 'ng build --configuration=production'
            }
        }

         stage('Crear Archivo ZIP para Despliegue') {
            steps {
                // Cambiar al directorio que contiene el index.html y crear el ZIP
                sh 'cd dist/fa-prb/browser && zip -r $WORKSPACE/build.zip .'
            }
        }

        stage('Desplegar en Azure') {
            steps {
               withCredentials([string(credentialsId: 'AZURE_CREDENTIALS', variable: 'AZURE_PASSWORD')]) {
                    sh '''
                   az login --service-principal -u "66b37867-bc76-4458-ae29-f44b19779846" \
                           -p "$AZURE_PASSWORD" --tenant "e7bdc976-7a05-4f0b-8634-982a206ae3d3"

                   az account set --subscription "5f3235c0-aef2-466d-bcc4-b390e0e5555e"

                    az webapp deployment source config-zip \
                   --resource-group $RESOURCE_GROUP \
                   --name $AZURE_APP_NAME \
                   --src build.zip
                  '''
               }
           }
        }
    }
    post {
        success {
            echo 'Despliegue exitoso en Azure 🚀'
        }
        failure {
            echo 'Falló el pipeline ❌'
        }
    }
}

