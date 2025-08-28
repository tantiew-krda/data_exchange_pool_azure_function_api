# data_exchange_pool_azure_function_api
## curl test
blob upload
```
curl -X POST "http://localhost:7071/api/uploadCsv?filename=test_upld.csv" \
  -H "Content-Type: text/csv" \
  --data-binary @./testfile/test_upld.csv
```

download
```
curl -X GET "http://localhost:7071/api/downloadFile?filename=test.csv" -o testfile/test_download.csv

```

check download none exist file in blob
```
curl -i "http://localhost:70 71/api/downloadFile?filename=test_null.csv"
```

delete
```
curl -X DELETE "http://localhost:7071/api/deleteCsv?filename=test_upld.csv"

```

undelete
```
curl -X DELETE "http://localhost:7071/api/deleteCsv?filename=test.csv&action=undelete"

```