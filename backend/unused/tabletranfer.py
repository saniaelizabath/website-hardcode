from pymongo import MongoClient

# SOURCE MongoDB
source_uri = "mongodb+srv://saniaeliz:YFfALN6gqEQEVFiq@cluster0.bquoh.mongodb.net/?appName=Cluster0"
source_db_name = "myapp_db"

# TARGET MongoDB
target_uri = "mongodb+srv://hrithik_db_user:pBS55TpEjbG6U5dM@cluster0.5e6xifr.mongodb.net/?appName=Cluster0"
target_db_name = "myapp_db"

# Connect to source and target
source_client = MongoClient(source_uri)
target_client = MongoClient(target_uri)

source_db = source_client[source_db_name]
target_db = target_client[target_db_name]

# Copy collections
for collection_name in source_db.list_collection_names():
    source_collection = source_db[collection_name]
    target_collection = target_db[collection_name]

    documents = list(source_collection.find())

    if documents:
        target_collection.insert_many(documents)

    print(f"Copied collection: {collection_name}")

print("✅ Database transfer completed successfully!")
