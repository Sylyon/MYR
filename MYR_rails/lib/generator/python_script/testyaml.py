import yaml

## define custom tag handler
def join(loader, node):
    seq = loader.construct_sequence(node)
    return ''.join([str(i) for i in seq])

## register the tag handler
yaml.add_constructor('!join', join)

## using your sample data
yaml.load("""
user_dir: &DIR /home/user
user_pics: !join [*DIR, /pics]
""")